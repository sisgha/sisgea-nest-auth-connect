import { Provider } from '@nestjs/common';
import { ISisgeaNestSsoConfigOidcClient } from '../../../domain';
import { SisgeaNestAuthConnectProvidedConfig } from '../../sisgea-nest-auth-connect/tokens/SisgeaNestAuthConnectProvidedConfig';
import { OidcClientContainer } from '../oidc-client-container';

export const OidcClientContainerProvider: Provider = {
  provide: OidcClientContainer,

  useFactory: (configService: ISisgeaNestSsoConfigOidcClient) => {
    return new OidcClientContainer(configService);
  },

  inject: [SisgeaNestAuthConnectProvidedConfig],
};
