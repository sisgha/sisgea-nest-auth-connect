import { Module } from '@nestjs/common';
import { OidcClientContainerModule } from '../oidc-client-container';
import { JwksRsaClientContainer } from './jwks-rsa-client-container';

@Module({
  imports: [
    //
    OidcClientContainerModule,
  ],
  providers: [
    //
    JwksRsaClientContainer,
  ],
  exports: [
    //
    JwksRsaClientContainer,
  ],
})
export class JwksRsaClientContainerModule {}
