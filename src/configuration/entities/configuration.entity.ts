import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ConfigurationEntity {
  @ApiProperty({ name: 'id', description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' })
  @Expose()
  @Type(() => String)
  id:string;

  @ApiProperty({ name: 'name', description: 'Name of the configuration', example: 'Ma configuration' })
  @Expose()
  @Type(() => String)
  name:string;

  @ApiProperty({ name: 'processor', description: 'Processor'})
  @Expose()
  @Type(() => String)
  processor:string;

  @ApiProperty({ name: 'cooler', description: 'Cooler', example: 'Cooler Master MasterLiquid ML240L V2 RGB' })
  @Expose()
  @Type(() => String)
  cooler:string;

  @ApiProperty({ name: 'motherboard', description: 'MotherBoard', example: 'Asus TUF B450-PLUS GAMING' })
  @Expose()
  @Type(() => String)
  motherboard:string;

  @ApiProperty({ name: 'ram', description: 'RAM', example: 'Corsair Vengeance LPX Black DDR4 2 x 8 Go 3200 MHz CAS 16' })
  @Expose()
  @Type(() => String)
  ram:string;

  @ApiProperty({ name: 'graphic_card', description: 'Graphic card', example: 'Gigabyte GeForce RTX 3070 GAMING OC' })
  @Expose()
  @Type(() => String)
  graphic_card:string;

  @ApiProperty({ name: 'ssd', description: 'SSD', example: 'Samsung 860 EVO - 500 Go' })
  @Expose()
  @Type(() => String)
  ssd:string;

  @ApiProperty({ name: 'hard_drive', description: 'HDD', example: 'Seagate BarraCuda - 2 To - 256 Mo' })
  @Expose()
  @Type(() => String)
  hard_drive:string;

  @ApiProperty({ name: 'case', description: 'Case', example: 'MSI MAG FORGE 100R' })
  @Expose()
  @Type(() => String)
  case:string;

  @ApiProperty({ name: 'power_supply_unit', description: 'Power suppluy unit', example: 'Corsair RM650 - Gold' })
  @Expose()
  @Type(() => String)
  power_supply_unit:string;

  @ApiProperty({ name: 'sound_card', description: 'Soundcard', example: 'Asus Xonar AE' })
  @Expose()
  @Type(() => String)
  sound_card:string;

  @ApiProperty({ name: 'network_adapter', description: 'Network Adapter', example: 'Gigabyte GC-WBAX200 - Carte PCI-E Wifi 6 + Bluetooth' })
  @Expose()
  @Type(() => String)
  network_adapter:string;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<ConfigurationEntity>) {
    Object.assign(this, partial);
  }
}
