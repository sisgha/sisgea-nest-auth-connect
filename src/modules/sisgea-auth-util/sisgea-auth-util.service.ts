import { Injectable, InternalServerErrorException } from '@nestjs/common';
import jwt, { GetPublicKeyOrSecret, JwtPayload } from 'jsonwebtoken';
import { IRequestUser } from '../../domain';
import { JwksRsaClientContainer } from '../jwks-rsa-client/jwks-rsa-client-container';
import { OidcClientContainer } from '../oidc-client-container';

@Injectable()
export class SisgeaAuthUtilService {
  constructor(
    private oidcClientContainer: OidcClientContainer,
    private jwksRsaClientService: JwksRsaClientContainer,
  ) {}

  private async jwtVerifyAccessToken(accessToken: string) {
    const getKeyFromHeader: GetPublicKeyOrSecret = async (header, callback) => {
      const kid = header.kid;

      if (kid) {
        const publicKey = await this.jwksRsaClientService.getSigninKeyPublicKeyByKid(kid);

        if (publicKey) {
          callback(null, publicKey);
        } else {
          callback(new InternalServerErrorException());
        }
      }

      callback(new Error());
    };

    return new Promise<null | JwtPayload>((resolve) => {
      jwt.verify(accessToken, getKeyFromHeader, (err, decoded) => {
        if (err) {
          resolve(null);
        } else {
          resolve(<JwtPayload>decoded);
        }
      });
    });
  }

  async handleAccessTokenSoft(accessToken: any): Promise<false | IRequestUser | null> {
    try {
      if (typeof accessToken === 'string') {
        const decoded = await this.jwtVerifyAccessToken(accessToken);

        const sub = decoded?.sub;

        if (sub) {
          return {
            sub: sub,
          };
        }
      }
    } catch (_) {
      return null;
    }

    return false;
  }

  private getOIDCTrustIssuerClient() {
    return this.oidcClientContainer.getTrustIssuerClient();
  }

  async handleAccessTokenHard(accessToken: any): Promise<false | IRequestUser | null> {
    try {
      if (typeof accessToken === 'string') {
        const trustIssuerClient = await this.getOIDCTrustIssuerClient();

        const userinfo = await trustIssuerClient.userinfo(accessToken);

        if (userinfo) {
          return <IRequestUser>{
            sub: userinfo.sub,
          };
        }
      }
    } catch (_) {
      return null;
    }

    return false;
  }

  async handleAccessToken(accessToken?: any): Promise<false | IRequestUser> {
    if (typeof accessToken !== 'string' || accessToken?.length === 0) {
      return false;
    }

    const softResult = await this.handleAccessTokenSoft(accessToken);

    if (softResult !== null) {
      return softResult;
    }

    const hardResult = await this.handleAccessTokenHard(accessToken);

    if (hardResult !== null) {
      return hardResult;
    }

    return false;
  }

  async validateAccessToken(accessToken?: string | any) {
    try {
      const userinfo = await this.handleAccessToken(accessToken);
      return userinfo;
    } catch (err) {
      // throw err;
    }

    return null;
  }
}
