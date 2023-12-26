import { Module } from '@nestjs/common';
import { JwksRsaClientContainerModule } from '../jwks-rsa-client/jwks-rsa-client-container.module';
import { OidcClientContainerModule } from '../oidc-client-container';
import { SisgeaAuthUtilService } from './sisgea-auth-util.service';

@Module({
  imports: [
    //
    OidcClientContainerModule,
    JwksRsaClientContainerModule,
  ],
  providers: [
    //
    SisgeaAuthUtilService,
  ],
  exports: [
    //
    SisgeaAuthUtilService,
  ],
})
export class SisgeaAuthUtilModule {}
