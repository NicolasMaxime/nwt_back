import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {LoginService} from '../service/auth/login.service';
import {CreateUserDto} from '../dto/create-user.dto';
import {AuthService} from '../service/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private _auth: AuthService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.raw.headers.authorization;
        if (!authorization)
            return false
        const token: string = authorization.split(' ')[1];
        return false;
    }
}
