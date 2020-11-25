import {ConflictException, Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {VerifLoginDto} from '../../dto/verif-login.dto';
import {CreateUserDto} from '../../dto/create-user.dto';
import {from, Observable, of, throwError} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {UserEntity} from '../../entities/user.entity';
import {UserAuthDao} from '../../dao/userAuth.dao';
import {AuthService} from './auth.service';
import {UpdateUserDto} from '../../dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(private _auth: AuthService,
                private readonly _userDao: UserAuthDao,
                ) {
    }

    /**
     * Get user && mdp from db then check
     * if given password is correct
     * @param toVerif
     */
    verifLogin(toVerif: VerifLoginDto): Observable<UserEntity>{
        return from (this._userDao.findByLogin(toVerif.login)).pipe(
            catchError(e => throwError(new UnprocessableEntityException(e.message))),
            mergeMap(_ => !!_ ?
                this._auth.validateUser(new UserEntity(_), toVerif.password):
                throwError( new NotFoundException('wrong user or password'))
            )
        );
    }

    private _deletefield(user: UserEntity): UserEntity{
        delete user.password;
        delete user.salt;
        return user;
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
                map(_ => this._deletefield(new UserEntity(_))),
            );
    }

    /**
     * Get one user by using userDao
     * @param login
     */
    findOne(login: string): Observable<UserEntity | void> {
        return this._userDao.findByLogin(login)
            .pipe(
                catchError(e => throwError(new UnprocessableEntityException(e.message))),
                mergeMap(_ =>
                    !!_ ?
                        of(this._deletefield(new UserEntity(_))) :
                        throwError(new NotFoundException(`user with login '${login}' not found`)),
                ),
            );
    }

    /**
     * Get all user
     */
    findAll(): Observable<UserEntity[] | void> {
        return this._userDao.find()
            .pipe(
                map(_ => !!_ ? _.map(__ => this._deletefield(new UserEntity(__))) : undefined),
            );
    }

    /**
     * Update user
     * @param user
     * @param login
     */
    update(user: UpdateUserDto, login: string): Observable<UserEntity> {
        return this._userDao.updateByLogin(user, login).pipe(
            catchError(e =>
                    throwError(new UnprocessableEntityException(e.message)),
            ),
            mergeMap(_ =>
                !!_ ?
                    of(this._deletefield(new UserEntity(_))) :
                    throwError(new NotFoundException(`People with login '${login}' not found`)),
            ),
        );
    }

    /**
     * delete user
     * @param login
     */
    delete(login: string): Observable<void> {
        return this._userDao.findByLoginAndRemove(login)
            .pipe(
                catchError(e => throwError(new UnprocessableEntityException(e.message))),
                mergeMap(_ =>
                    !!_ ?
                        of(undefined) :
                        throwError(new NotFoundException(`Person with id '${login}' not found`)),
                ),
            );
    }

    /**
     * Update favorites of a user
     * @param user
     * @param login
     */
    updateFavorite(user: UpdateUserDto, login: string) : Observable<UserEntity>{
        return this._userDao.updateFavoriteByLogin(user, login).pipe(
            catchError(e =>
                throwError(new UnprocessableEntityException(e.message)),
            ),
            mergeMap(_ =>
                !!_ ?
                    of(this._deletefield(new UserEntity(_))) :
                    throwError(new NotFoundException(`People with login '${login}' not found`)),
            ),
        );
    }
}
