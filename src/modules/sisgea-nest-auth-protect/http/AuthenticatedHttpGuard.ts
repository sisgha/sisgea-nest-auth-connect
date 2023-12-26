import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {SisgeaNestAuthConnectPassportStrategy} from "../../../domain";

@Injectable()
export class AuthenticatedHttpGuard extends AuthGuard([SisgeaNestAuthConnectPassportStrategy.ACCESS_TOKEN]) {
  getRequest(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    return req;
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = this.getRequest(context);

    const hasAuthorizationToken = req.headers.authorization !== undefined;

    if (hasAuthorizationToken) {
      return Promise.resolve(super.canActivate(context));
    }

    return true;
  }
}
