import {IsNotEmpty, IsOptional} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class VerifLoginDto {
    @ApiProperty({ name: 'login', description: 'login', example: 'MySupaLogin' })
    @IsNotEmpty()
    login: string;

    @ApiProperty({ name: 'password', description: 'Password', example: 'MyPasswd' })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ name: 'admin', description: 'Is admin ?', example: 'true' })
    @IsOptional()
    admin?: boolean;

    @ApiProperty({ name: 'token', description: 'User token to authenticate him', example: 'whodazuhfmgfzazihfvw2a8dfezz3f4azdfz' })
    @IsOptional()
    token?: string;

    @ApiProperty({ name: 'salt', description: 'User salt to authenticate him', example: 'whodazuhfmgfzazihfvw2a8dfezz3f4azdfz' })
    @IsOptional()
    salt?: string;
}
