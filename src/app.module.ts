import {Module} from '@nestjs/common';
import { ProcessorModule } from './processor/processor.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import * as Config from 'config';

@Module({
  imports: [
    ProcessorModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri'), Config.get<MongooseModuleOptions>('mongodb.options')),
  ],
})
export class AppModule {}
