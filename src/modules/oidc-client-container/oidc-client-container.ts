import { BaseClient, Issuer } from 'openid-client';
import { ISisgeaNestSsoConfigOidcClient } from '../../domain';

export class OidcClientContainer {
  #initialized = false;
  trustIssuerClient: BaseClient | null = null;

  constructor(
    //
    readonly configService: ISisgeaNestSsoConfigOidcClient,
  ) {}

  private get oidcClientCredentials() {
    return this.configService.getOidcClientCredentials();
  }

  async setup() {
    if (!this.#initialized) {
      try {
        const oidcClientCredentials = this.oidcClientCredentials;

        const TrustIssuer = await Issuer.discover(oidcClientCredentials.issuer);

        const trustIssuerClient = new TrustIssuer.Client({
          client_id: oidcClientCredentials.clientId,
          client_secret: oidcClientCredentials.clientSecret,
        });

        this.trustIssuerClient = trustIssuerClient;

        this.#initialized = true;
      } catch (error) {
        console.log(error);
      }
    }

    return this.#initialized;
  }

  async getTrustIssuerClient() {
    while (!this.#initialized) {
      await this.setup();
    }

    const trustIssuerClient = this.trustIssuerClient;

    if (trustIssuerClient) {
      return trustIssuerClient;
    }

    throw new Error('[KeycloakAdminClientContainer::error] trustIssuerClient is null');
  }
}
