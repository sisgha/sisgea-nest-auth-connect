import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { SisgeaNestAuthConnectPassportStrategy } from '../../../domain';

@Injectable()
export class AuthenticatedGqlGuard extends AuthGuard([SisgeaNestAuthConnectPassportStrategy.ACCESS_TOKEN]) {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
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
