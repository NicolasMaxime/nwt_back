import {IsEmail, IsMongoId, IsNotEmpty, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    token?: string;

    @IsOptional()
    salt?: string;
}
