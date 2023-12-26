import { Module } from '@nestjs/common';
import { OidcClientContainerProvider } from './providers/oidc-client-container.provider';

@Module({
  providers: [
    //
    OidcClientContainerProvider,
  ],
  exports: [
    //
    OidcClientContainerProvider,
  ],
})
export class OidcClientContainerModule {}
