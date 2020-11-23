import {Exclude, Expose, Type} from 'class-transformer';

@Exclude()
export class UserEntity{
    @Expose()
    @Type(() => String)
    login: string;

    @Type(() => String)
    password: string;

    @Expose()
    @Type(() => String)
    token: string;

    @Expose()
    @Type(() => Boolean)
    admin: boolean;

    @Type(() => String)
    salt: string;

    @Expose()
    @Type(() => String)
    firstname?: string;

    @Expose()
    @Type(() => String)
    lastname?: string;

    @Expose()
    @Type(() => String)
    email?: string;


    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
