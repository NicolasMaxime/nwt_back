import {ConflictException, Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {VerifLoginDto} from '../../dto/verif-login.dto';
import {CreateUserDto} from '../../dto/create-user.dto';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, filter, find, map, mergeMap, tap} from 'rxjs/operators';
import {User} from '../../user.interface';
import {UserEntity} from '../../entity/UserEntity';
import {UserDao} from '../../dao/user.dao';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {

    private _users: User[];

    constructor(private _auth: AuthService,
                private readonly _userDao: UserDao,
                ) {

        this._users = [] as User[];
        this._users[0] = {login: 'test', password:'test', email:'test@test.com'};
    }

    /**
     * Get login && mdp from db then check
     * if given password is correct
     * @param toVerif
     */
    verifLogin(toVerif: VerifLoginDto): Observable<UserEntity>{
        return from (this._userDao.findByLogin(toVerif.login)).pipe(
            tap(_ => console.log(toVerif)),
            catchError(e => throwError(new UnprocessableEntityException(e.message))),
            mergeMap(_ => !!_ ?
                this._auth.validateUser(new UserEntity(_), toVerif.password):
                throwError( new NotFoundException('wrong login or password'))
            )
        );
    }

    /**
     * Call userDao to save a user
     * @param user
     */
    createLogin(user: CreateUserDto): Observable<UserEntity>{
        return this._auth.generatePassword(user)
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

    /**
     * Call DAO to find all users
     */
    findAll(): Observable<UserEntity[] | void> {
        return this._userDao.find()
            .pipe(
                map(_ => !!_ ? _.map(__ => new UserEntity(__)) : undefined),
            );
    }
}
