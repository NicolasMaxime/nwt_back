import {IsEmail, IsOptional, IsString} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {UpdateConfigurationDto} from "../../configuration/dto/update-configuration.dto";

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

    @ApiPropertyOptional({ name: 'favorites', description: 'User\'s favorites', example: 'see Configuration', isArray: true })
    @IsOptional()
    favorites: UpdateConfigurationDto[]
}
