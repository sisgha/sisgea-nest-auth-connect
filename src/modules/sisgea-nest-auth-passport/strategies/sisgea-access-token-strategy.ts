import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { SisgeaNestAuthConnectPassportStrategy } from '../../../domain';
import { SisgeaAuthUtilService } from '../../sisgea-auth-util';

@Injectable()
export class SisgeaAccessTokenStrategy extends PassportStrategy(Strategy, SisgeaNestAuthConnectPassportStrategy.ACCESS_TOKEN) {
  constructor(
    //
    readonly sisgeaAuthUtilService: SisgeaAuthUtilService,
  ) {
    super();
  }

  async validate(accessToken?: string) {
    const user = await this.sisgeaAuthUtilService.validateAccessToken(accessToken);

    if (!user) {
      throw new UnauthorizedException('The provided access token is either invalid or expired.');
    }

    return user;
  }
}
