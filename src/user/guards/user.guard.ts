import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth/auth.service";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private _auth: AuthService) {
  }

  /**
   * Check is user has access to a page with a route without param
   * @param context
   */
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.raw.headers.authorization;
    if (!authorization)
      return false;
    const token: string = authorization.split(' ')[1];
    const login: string = authorization.split(' ')[2];
    let ok: boolean = this._auth.validateToken(token, login);
    return ok;
  }
}
