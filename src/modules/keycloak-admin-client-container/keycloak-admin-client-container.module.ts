import { Module } from '@nestjs/common';
import { KeycloakAdminClientContainerProvider } from './providers/keycloak-admin-client-container.provider';

@Module({
  providers: [
    //
    KeycloakAdminClientContainerProvider,
  ],
  exports: [
    //
    KeycloakAdminClientContainerProvider,
  ],
})
export class KeycloakAdminClientContainerModule {}
