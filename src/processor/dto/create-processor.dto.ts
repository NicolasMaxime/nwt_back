import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProcessorDto {

  @IsString()
  @IsNotEmpty()
  designer:string;

  @IsString()
  @IsNotEmpty()
  family:string;

  @IsString()
  @IsNotEmpty()
  modelName:string;

  @IsNumber()
  @IsNotEmpty()
  clock:number;

  @IsNumber()
  @IsNotEmpty()
  max_clock:number;

  @IsNumber()
  @IsNotEmpty()
  cache:number;

  @IsNumber()
  @IsNotEmpty()
  cores:number;

  @IsNumber()
  @IsNotEmpty()
  threads:number;
}
