import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProcessorDto {

  @IsString()
  @IsOptional()
  designer?:string;

  @IsString()
  @IsOptional()
  family?:string;

  @IsString()
  @IsNotEmpty()
  modelName:string;

  @IsNumber()
  @IsOptional()
  clock?:number;

  @IsNumber()
  @IsOptional()
  max_clock?:number;

  @IsNumber()
  @IsOptional()
  cache?:number;

  @IsNumber()
  @IsOptional()
  cores?:number;

  @IsNumber()
  @IsOptional()
  threads?:number;
}
