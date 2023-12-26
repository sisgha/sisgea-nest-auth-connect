import { Provider } from '@nestjs/common';
import { ISisgeaNestAuthConnectConfigKeycloak } from '../../../domain';
import { SisgeaNestAuthConnectProvidedConfig } from '../../sisgea-nest-auth-connect/tokens/SisgeaNestAuthConnectProvidedConfig';
import { KeycloakAdminClientContainer } from '../keycloak-admin-client-container';

export const KeycloakAdminClientContainerProvider: Provider = {
  provide: KeycloakAdminClientContainer,

  useFactory: (configService: ISisgeaNestAuthConnectConfigKeycloak) => {
    return new KeycloakAdminClientContainer(configService);
  },

  inject: [SisgeaNestAuthConnectProvidedConfig],
};
