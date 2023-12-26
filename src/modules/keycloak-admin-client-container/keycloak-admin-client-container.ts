import type KcAdminClient from '@keycloak/keycloak-admin-client';
import { Credentials } from '@keycloak/keycloak-admin-client/lib/utils/auth';
import { ISisgeaNestSsoConfigKeycloak } from '../../domain';
import { getModuleKeycloakAdminClient } from '../../infrastructure/helpers/module.kc-admin-client';
import { wait } from '../../infrastructure/helpers/wait';

const INTERVAL_AUTH = 58 * 1000;

export class KeycloakAdminClientContainer {
  #initialized = false;

  kcAdminClient: KcAdminClient | null = null;

  #authInterval: NodeJS.Timeout | null = null;

  constructor(
    //
    readonly configService: ISisgeaNestSsoConfigKeycloak,
  ) {}

  private get keycloakConfigCredentials() {
    return this.configService.getKeycloakConfigCredentials();
  }

  private getClientAuthCredentials() {
    const keycloakConfigCredentials = this.keycloakConfigCredentials;

    const credentials: Credentials = {
      grantType: 'client_credentials',
      clientId: keycloakConfigCredentials.clientId,
      clientSecret: keycloakConfigCredentials.clientSecret,
    };

    return credentials;
  }

  private async clearAuthInterval() {
    if (this.#authInterval !== null) {
      clearInterval(this.#authInterval);
      this.#authInterval = null;
    }
  }

  async setupAuthInterval() {
    await this.clearAuthInterval();

    this.#authInterval = setInterval(() => {
      this.authenticate();
    }, INTERVAL_AUTH);
  }

  async setup() {
    if (!this.#initialized) {
      try {
        const KcAdminClient = await getModuleKeycloakAdminClient();

        const keycloakConfigCredentials = this.keycloakConfigCredentials;

        this.kcAdminClient = new KcAdminClient({
          baseUrl: keycloakConfigCredentials.baseUrl,
          realmName: keycloakConfigCredentials.realm,
        });

        await this.authenticate();
        await this.setupAuthInterval();

        this.#initialized = true;
      } catch (error) {
        await this.clearAuthInterval();
      }
    }

    return this.#initialized;
  }

  async authenticate() {
    const keycloakConfigCredentials = this.keycloakConfigCredentials;

    const kcAdminClient = this.kcAdminClient;

    if (kcAdminClient) {
      const currentRealm = kcAdminClient.realmName;

      kcAdminClient.setConfig({
        realmName: keycloakConfigCredentials.realm,
      });

      const credentials = this.getClientAuthCredentials();

      try {
        await kcAdminClient.auth(credentials);
      } catch (e) {
        console.error('[KeycloakAdminClientContainer::error] Can not connect to KeyCloak.');
        throw e;
      } finally {
        kcAdminClient.setConfig({ realmName: currentRealm });
      }
    }
  }

  async getAdminClient(maxRetries = 3) {
    let retryCount = 0;

    do {
      const result = await this.setup();

      if (!result) {
        await wait(retryCount * 500);

        retryCount++;
      }
    } while (!this.#initialized && retryCount < maxRetries);

    const kcAdminClient = this.kcAdminClient;

    if (kcAdminClient) {
      return kcAdminClient;
    }

    throw new Error('[KeycloakAdminClientContainer::error] kcAdminClient is null');
  }
}
