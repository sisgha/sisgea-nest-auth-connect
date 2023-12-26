import { Module } from '@nestjs/common';
import { JwksRsaClientContainerModule } from '../jwks-rsa-client';
import { KeycloakAdminClientContainerModule } from '../keycloak-admin-client-container';
import { OidcClientContainerModule } from '../oidc-client-container';
import { SisgeaAuthUtilModule } from '../sisgea-auth-util';
import { SisgeaNestAuthPassportModule } from '../sisgea-nest-auth-passport';

@Module({
  imports: [
    //
    JwksRsaClientContainerModule,
    KeycloakAdminClientContainerModule,
    OidcClientContainerModule,
    SisgeaAuthUtilModule,
    SisgeaNestAuthPassportModule,
  ],
})
export class SisgeaNestAuthConnectModule {}
