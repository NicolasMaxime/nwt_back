import {IsNotEmpty, IsOptional} from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    admin?: boolean;

    @IsOptional()
    salt?: string;
}
