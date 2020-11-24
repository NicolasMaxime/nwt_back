import {IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ name: 'firstname', description: 'Firstname', example: 'Mclaughlin' })
    @IsString()
    @IsOptional()
    firstname?: string;

    @ApiProperty({ name: 'lastname', description: 'Lastname', example: 'Cochran' })
    @IsString()
    @IsOptional()
    lastname?: string;


    @ApiPropertyOptional({ name: 'email', description: 'Email', example: 'Mclaughlin.Cochran@undefined.com' })
    @IsOptional()
    @IsEmail()
    email?: string;
}
