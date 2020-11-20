import { Logger, Module } from '@nestjs/common';
import { ProcessorController } from './processor.controller';
import { ProcessorService } from './processor.service';
import { Processor, ProcessorSchema } from './schemas/processor.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcessorDao } from './dao/processor.dao';

@Module({
  imports:[ MongooseModule.forFeature([{name: Processor.name, schema: ProcessorSchema}])],
  controllers: [ProcessorController],
  providers: [ProcessorService,Logger,ProcessorDao]
})
export class ProcessorModule {}
