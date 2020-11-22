import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateConfigurationDto {

  @IsString()
  @IsNotEmpty()
  name:string;

  @IsString()
  @IsNotEmpty()
  processor:string;

  @IsString()
  @IsNotEmpty()
  cooler:string;

  @IsString()
  @IsNotEmpty()
  motherboard:string;

  @IsString()
  @IsNotEmpty()
  ram:string;

  @IsString()
  @IsNotEmpty()
  graphic_card:string;

  @IsString()
  @IsNotEmpty()
  ssd:string;
  @IsString()
  @IsNotEmpty()
  hard_drive:string;

  @IsString()
  @IsNotEmpty()
  case:string;

  @IsString()
  @IsNotEmpty()
  power_supply_unit:string;

  @IsString()
  @IsNotEmpty()
  sound_card:string;

  @IsString()
  @IsNotEmpty()
  network_adapter:string;
}
