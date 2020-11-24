import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth/auth.service';

@Injectable()
export class AuthGuardGet implements CanActivate{

    constructor(private _auth: AuthService) {
    }

    /**
     * Check if user has access to route where login is a param
     * Check if login user == login which information are asked
     * @param context
     */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.raw.headers.authorization;
        if (!authorization)
            return false;
        const token: string = authorization.split(' ')[1];
        const login: string = authorization.split(' ')[2];
        let nameInUrl: string = request.raw.url.split('/').pop();
        let ok: boolean = this._auth.validateToken(token, login);
        if (nameInUrl === login)
            return ok;
        else
            return false;
    }
}
