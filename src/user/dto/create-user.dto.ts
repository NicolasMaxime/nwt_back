import {IsNotEmpty, IsOptional} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({ name: 'login', description: 'login', example: 'Imagroot' })
    @IsNotEmpty()
    login: string;

    @ApiProperty({ name: 'firstname', description: 'Firstname', example: '4NGuL4R' })
    @IsNotEmpty()
    password: string;

    @IsOptional()
    admin?: boolean;

    @IsOptional()
    salt?: string;
}
