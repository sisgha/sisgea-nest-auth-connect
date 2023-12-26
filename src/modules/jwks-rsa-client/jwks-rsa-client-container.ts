import { Injectable } from '@nestjs/common';
import jwksClient, { JwksClient, SigningKey } from 'jwks-rsa';
import { OidcClientContainer } from '../oidc-client-container';

@Injectable()
export class JwksRsaClientContainer {
  #jwksClient: JwksClient | null = null;

  constructor(
    //
    private oidcClientContainer: OidcClientContainer,
  ) {}

  private async createJwksClient() {
    const trustIssuerClient = await this.oidcClientContainer.getTrustIssuerClient();

    const jwksUri = trustIssuerClient.issuer.metadata.jwks_uri ?? null;

    if (jwksUri) {
      return jwksClient({
        timeout: 30000, // Defaults to 30s

        cache: true, // Default Value
        cacheMaxEntries: 5, // Default value
        cacheMaxAge: 600000, // Defaults to 10m

        rateLimit: true,
        jwksRequestsPerMinute: 10, // Default value

        jwksUri: jwksUri,
      });
    } else {
      throw new Error('jwks_uri not found');
    }
  }

  private async setup() {
    if (!this.#jwksClient) {
      this.#jwksClient = await this.createJwksClient();
    }
  }

  async getJwksClient() {
    await this.setup();

    if (!this.#jwksClient) {
      throw new Error('[JwksRsaClientService::error] Can not create JwksClient.');
    }

    return this.#jwksClient;
  }

  async getSigninKeyByKid(kid: string | null): Promise<SigningKey | null> {
    try {
      if (kid) {
        const jwksClient = await this.getJwksClient();

        const signingKey = await jwksClient.getSigningKey(kid);

        return signingKey;
      }
    } catch (_) {}

    return null;
  }

  async getSigninKeyPublicKeyByKid(kid: string | null): Promise<string | null> {
    const signingKey = await this.getSigninKeyByKid(kid);

    if (signingKey) {
      return signingKey.getPublicKey();
    }

    return null;
  }
}
