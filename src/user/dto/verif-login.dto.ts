import {IsNotEmpty, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class VerifLoginDto {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    admin?: boolean;

    @IsOptional()
    token?: string;
}
