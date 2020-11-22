import {
  IsNotEmpty, IsOptional,
  IsString,
} from 'class-validator';

export class UpdateConfigurationDto {

  @IsString()
  @IsNotEmpty()
  name:string;

  @IsOptional()
  @IsString()
  processor?:string;

  @IsOptional()
  @IsString()
  cooler?:string;

  @IsOptional()
  @IsString()
  motherboard?:string;

  @IsOptional()
  @IsString()
  ram?:string;

  @IsOptional()
  @IsString()
  graphic_card?:string;

  @IsOptional()
  @IsString()
  ssd?:string;

  @IsOptional()
  @IsString()
  hard_drive?:string;

  @IsOptional()
  @IsString()
  case?:string;

  @IsOptional()
  @IsString()
  power_supply_unit?:string;

  @IsOptional()
  @IsString()
  sound_card?:string;

  @IsOptional()
  @IsString()
  network_adapter?:string;
}
