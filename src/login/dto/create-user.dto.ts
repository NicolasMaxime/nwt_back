import {IsEmail, IsMongoId, IsNotEmpty, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    salt?: string;
}
