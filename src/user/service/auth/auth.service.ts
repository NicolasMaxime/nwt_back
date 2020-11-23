import {Injectable, NotFoundException} from '@nestjs/common';
import {UserEntity} from '../../entities/user.entity';
import {map, mergeMap, tap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {HashService, RandomStringService} from '@akanass/nestjsx-crypto';
import {JwtService} from '@nestjs/jwt';
import {JwtConfigService} from '../jwt-config/jwt-config.service';
import {CreateUserDto} from '../../dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor( private readonly _randomStringService: RandomStringService,
                private readonly _hashService: HashService,
                private _jwtService: JwtService,
                private _jwtOption: JwtConfigService
                ) {}

    /**
     * Verification of user password
     * @param user
     * @param password
     */
    validateUser(user: UserEntity, password: string): Observable<UserEntity>{
        return this._hashService.generate(password, user.salt, 4096, 24, 'sha256')
            .pipe(
                mergeMap(_ => _.toString('hex') === user.password ?
                this.assignToken(user)
                : throwError( new NotFoundException('wrong user or password'))
            )
        );
    }

    /**
     * Assign a JWT's token to a logged in user
     * @param user
     * @private
     */
    assignToken(user: UserEntity): Observable<UserEntity>{
        return of(user).pipe(
            tap(_ => _.token = this._jwtService.sign(
                {sub: _.login,admin: _.admin},
                this._jwtOption.createSignOption()
            )),
            map(_ => _)
        );
    }

    /**
     * Build a user hashed password to replace the user password
     * @param user
     * @private
     */

    generatePassword(user: CreateUserDto): Observable<UserEntity> {
        return this._randomStringService.generate().pipe(
            tap(_ => user.salt = _),
            mergeMap(_ => this._hashService.generate(user.password, _, 4096, 24, 'sha256')),
            tap(_ => user.password = _.toString('hex')),
            mergeMap(_ =>
                of(user).pipe(
                    map(_ => Object.assign(_, {
                            admin: false,
                            token: '',
                        }) as UserEntity,
                    ),
                )));
    }

    /**
     * Check token's signature
     * @param token
     */
    validateToken(token: string, login: string){
        let x = this._jwtService.verify(token, this._jwtOption.createSignOption());
        return x.sub === login;
    }
}
