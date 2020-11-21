import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User} from '../schemas/user.schema';
import {Model, MongooseDocument} from 'mongoose';
import {from, Observable, of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {log} from 'util';
import {AuthEntity} from '../entity/AuthEntity';
import {CreateUserDto} from '../dto/create-user.dto';

@Injectable()
export class UserDao {
    /**
     * Class constructor
     *
     * @param {Model<Person>} _personModel instance of the model representing a Person
     */
    constructor(@InjectModel(User.name) private readonly _userModel: Model<User>) {
    }


    /**
     * Return all users
     */
    find(): Observable<User[] | void> {
        return from(this._userModel.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
            );
    }

    /**
     * Find and return a user by its login
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
}
