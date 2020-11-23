import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../service/auth/auth.service';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly _logger: Logger;
  constructor(private readonly _reflector: Reflector) {
    this._logger = new Logger();
  }

  canActivate(_context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this._reflector.get<string[]>('roles', _context.getHandler());
    if (!roles) {
      return true;
    }
    const request = _context.switchToHttp().getRequest();
    const user = request.user;
    this._logger.log(user);
    const hasRole = () =>
      user.roles.some(role => !!roles.find(item => item === role));

    return user && user.roles && hasRole();

  }
}
