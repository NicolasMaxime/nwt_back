import {ConflictException, Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {VerifLoginDto} from '../../dto/verif-login.dto';
import {CreateUserDto} from '../../dto/create-user.dto';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, filter, find, map, mergeMap, tap} from 'rxjs/operators';
import {User} from '../../user.interface';
import {JwtService} from '@nestjs/jwt';
import {JwtConfigService} from '../jwt-config/jwt-config.service';
import {UserEntity} from '../../entity/UserEntity';
import {UserDao} from '../../dao/user.dao';
import {HashService, RandomStringService} from '@akanass/nestjsx-crypto';

@Injectable()
export class AuthService {

    private _users: User[];

    constructor(private _jwtService: JwtService,
                private _jwtOption: JwtConfigService,
                private readonly _userDao: UserDao,
                private readonly _randomStringService: RandomStringService,
                private readonly _hashService: HashService) {

        this._users = [] as User[];
        this._users[0] = {login: 'test', password:'test', email:'test@test.com'};
    }

    verifLogin(toVerif: VerifLoginDto): Observable<UserEntity>{
        return from (this._userDao.findByLogin(toVerif.login)).pipe(
            catchError(e => throwError(new UnprocessableEntityException(e.message))),
            mergeMap(_ => !!_ ?
                this._verifPassword(new UserEntity(_), toVerif.password):
                throwError( new NotFoundException('wrong login or password'))
            )
        );
    }

    private _assignToken(user: UserEntity): Observable<UserEntity>{
        return of(user).pipe(
            tap(_ => _.token = this._jwtService.sign(
                {sub: _.login},
                this._jwtOption.createSignOption()
            )),
          map(_ => _)
        );
    }

    createLogin(user: CreateUserDto): Observable<UserEntity>{
        return this._addUser(user)
            .pipe(
            mergeMap(_ => this._userDao.save(_)),
                catchError(e =>
                    e.code === 11000 ?
                        throwError(
                            new ConflictException(`User with login '${user.login}' already exists`),
                        ) :
                        throwError(new UnprocessableEntityException(e.message)),
                ),
                map(_ => new UserEntity(_)),
            );
    }

    private _addUser(user: CreateUserDto): Observable<CreateUserDto> {

        return this._randomStringService.generate().pipe(
            tap(_ => user.salt = _),
            mergeMap(_ => this._hashService.generate(user.password, _, 4096, 24, 'sha256')),
            tap(_ => user.password = _.toString('hex')),
            mergeMap(_ =>
            of(user).pipe(
                map(_ => Object.assign(_, {
                        token: '',
                    }) as User,
                ),
                map(_ => _)
            )));
    }

    findAll(): Observable<UserEntity[] | void> {
        return this._userDao.find()
            .pipe(
                map(_ => !!_ ? _.map(__ => new UserEntity(__)) : undefined),
            );
    }

    private _verifPassword(user: UserEntity, password: string): Observable<UserEntity> {

            return this._hashService.generate(password, user.salt, 4096, 24, 'sha256').pipe(
                mergeMap(_ => _.toString('hex') === user.password ? this._assignToken(user):
                    throwError( new NotFoundException('wrong login or password')))
            );
    }
}
