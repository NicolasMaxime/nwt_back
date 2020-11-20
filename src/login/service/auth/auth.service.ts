import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {VerifLoginDto} from '../../dto/verif-login.dto';
import {CreateUserDto} from '../../dto/create-user.dto';
import {from, Observable, of, throwError} from 'rxjs';
import {filter, find, map, mergeMap, tap} from 'rxjs/operators';
import {User} from '../../user.interface';
import {JwtService} from '@nestjs/jwt';
import {JwtConfigService} from '../jwt-config/jwt-config.service';

@Injectable()
export class AuthService {

    private _users: User[];

    constructor(private _jwtService: JwtService,
                private _jwtOption: JwtConfigService) {
        this._users = [] as User[];
        this._users[0] = {login: 'test', password:'test', email:'test@test.com'};
    }

    verifLogin(toVerif: VerifLoginDto): Observable<User>{
        return from (this._users).pipe(
            find(_ => _.login === toVerif.login &&
                _.password === toVerif.password
            ),
            mergeMap(_ => !!_ ?
                this._assignToken(_):
                throwError( new NotFoundException('wrong login or password'))
            )
        );
    }

    private _assignToken(user: User): Observable<User>{
        return of(user).pipe(
            tap(_ => _.token = this._jwtService.sign(
                {sub: _.login},
                this._jwtOption.createSignOption()
            )),
          map(_ => _)
        );
    }

    createLogin(user: CreateUserDto): Observable<User>{
        return from(this._users).pipe(
            find(_ => _.login === user.login),
            mergeMap(_ => !!_?
                throwError(
                  new ConflictException(`People with login ${user.login} already exists`),  
                ) :
                this._addUser(user),
            ),
        );
    }

    private _addUser(user: CreateUserDto): Observable<User> {
        return of(user).pipe(
            tap(_ => {
                _.token = '';
                this._users = this._users.concat(_);
            }),
            map(_ => _)
        );
    }

    findall(): Observable<User[]> {
        return of(this._users).pipe(
          map(_ => (!!_ && !!_.length)? _ : undefined)
        );
    }
}
