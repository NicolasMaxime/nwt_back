import {Exclude, Expose, Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import {IsOptional} from 'class-validator';

@Exclude()
export class AuthEntity{
    @Expose()
    @Type(() => String)
    login: string;

    @Type(() => String)
    password: string;

    @Expose()
    @Type(() => String)
    token: string;


    @Type(() => String)
    salt: string;

    constructor(partial: Partial<AuthEntity>) {
        Object.assign(this, partial);
    }
}
