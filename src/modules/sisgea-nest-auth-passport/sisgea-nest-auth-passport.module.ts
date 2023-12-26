import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SisgeaAuthUtilModule } from '../sisgea-auth-util';
import { SisgeaSessionSerializer } from './serializers';
import { SisgeaAccessTokenStrategy } from './strategies';
import { SisgeaNestAuthConnectPassportStrategy } from '../../domain';

@Module({
  imports: [
    SisgeaAuthUtilModule,

    // ...

    PassportModule.register({
      defaultStrategy: SisgeaNestAuthConnectPassportStrategy.ACCESS_TOKEN,
    }),

    // ...
  ],

  providers: [
    // ...
    SisgeaAccessTokenStrategy,
    SisgeaSessionSerializer,
  ],

  exports: [
    // ...
    SisgeaSessionSerializer,
  ],
})
export class SisgeaNestAuthPassportModule {}
