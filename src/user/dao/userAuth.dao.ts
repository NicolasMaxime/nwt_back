import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User} from '../schemas/user.schema';
import {Model, MongooseDocument} from 'mongoose';
import {from, Observable, of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {CreateUserDto} from '../dto/create-user.dto';
import {UpdateUserDto} from '../dto/update-user.dto';
import {UserEntity} from '../entities/user.entity';

@Injectable()
export class UserAuthDao {
    /**
     * Class constructor
     *
     * @param {Model<Person>} _personModel instance of the model representing a Person
     */
    constructor(@InjectModel(User.name) private readonly _userModel: Model<User>) {
    }

    /**
     * Find and return a user by its user
     * @param login
     */
    findByLogin(login: string): Observable<User | void> {
        return from(this._userModel.findOne({login: login}))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
            );
    }

    /**
     * Save user in databse
     * @param user
     */
    save(user: CreateUserDto) : Observable<User>{
        return from(new this._userModel(user).save())
            .pipe(
                map((doc: MongooseDocument) => doc.toJSON())
            )
    }

    /**
     * Find all user in database
     */
    find(): Observable<User[] | void> {
        return from(this._userModel.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
            );
    }

    /**
     * Update a user by his login
     * @param user
     * @param login
     */
    updateByLogin(user: UpdateUserDto, login: string): Observable<User>{
        return from(this._userModel.findOneAndUpdate({ login:login }, user)).pipe(
            map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
        );
    }

    /**
     * Find a user by his login and remove it
     * @param login
     */
    findByLoginAndRemove(login: string): Observable<User | void> {
        return from(this._userModel.findOneAndDelete({ login:login })).pipe(
            map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
        );
    }
}
