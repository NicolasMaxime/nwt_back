import {Exclude, Expose, Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

@Exclude()
export class UserEntity{

    @Expose()
    @Type(() => String)
    id : string

    @Expose()
    @Type(() => String)
    login: string;

    @Expose()
    @Type(() => String)
    token: string;

    @Type(() => String)
    password: string;

    @Expose()
    @Type(() => String)
    lastname?: string;

    @Expose()
    @Type(() => String)
    firstname?: string;

    @Type(() => String)
    salt: string;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
