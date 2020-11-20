import {Exclude, Expose, Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

@Exclude()
export class UserEntity{
    @Expose()
    @Type(() => String)
    login: string;

    @Expose()
    @Type(() => String)
    token: string;

    @Type(() => String)
    password: string;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
