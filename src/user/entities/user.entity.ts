import {Exclude, Expose, Type} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

@Exclude()
export class UserEntity{
    @ApiProperty({ name: 'login', description: 'Unique identifier in the database', example: 'RedVlador' })
    @Expose()
    @Type(() => String)
    login: string;

    @Type(() => String)
    password: string;

    @ApiProperty({ name: 'token', description: 'Token to authenticate the user', example: 'zad1f5a46zad13azd685azd' })
    @Expose()
    @Type(() => String)
    token: string;

    @ApiProperty({ name: 'admin', description: 'Is admin ?', example: 'true' })
    @Expose()
    @Type(() => Boolean)
    admin: boolean;

    @Type(() => String)
    salt: string;

    @ApiProperty({ name: 'firstname', description: 'Firstname', example: 'Mclaughlin' })
    @Expose()
    @Type(() => String)
    firstname?: string;

    @ApiProperty({ name: 'lastname', description: 'Lastname', example: 'Cochran' })
    @Expose()
    @Type(() => String)
    lastname?: string;

    @ApiProperty({ name: 'email', description: 'Email', example: 'Mclaughlin.Cochran@undefined.com' })
    @Expose()
    @Type(() => String)
    email?: string;


    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
