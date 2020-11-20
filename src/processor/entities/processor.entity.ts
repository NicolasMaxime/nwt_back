import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class ProcessorEntity {
  @ApiProperty({ name: 'id', description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' })
  @Expose()
  @Type(() => String)
  id:string;

  @ApiProperty({ name: 'designer', description: 'Designer', example: 'Intel' })
  @Expose()
  @Type(() => String)
  designer:string;

  @ApiProperty({ name: 'family', description: 'Family', example: 'Core i7' })
  @Expose()
  @Type(() => String)
  family:string;

  @ApiProperty({ name: 'modelName', description: 'Model Name', example: 'i7-660UM' })
  @Expose()
  @Type(() => String)
  modelName:string;

  @ApiProperty({ name: 'clock', description: 'Clock', example: '2800.0' })
  @Expose()
  @Type(() => Number)
  clock:number;

  @ApiProperty({ name: 'max_clock', description: 'Maximum Clock', example: '3200.0' })
  @Expose()
  @Type(() => Number)
  max_clock:number;

  @ApiProperty({ name: 'cache', description: 'Cache', example: '8192' })
  @Expose()
  @Type(() => Number)
  cache:number;

  @ApiProperty({ name: 'cores', description: 'Cores', example: '6' })
  @Expose()
  @Type(() => Number)
  cores:number;

  @ApiProperty({ name: 'threads', description: 'Threads', example: '12' })
  @Expose()
  @Type(() => Number)
  threads:number;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<ProcessorEntity>) {
    Object.assign(this, partial);
  }
}
