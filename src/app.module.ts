import {Module} from '@nestjs/common';
import { ProcessorModule } from './processor/processor.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import * as Config from 'config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
      ProcessorModule,
      MongooseModule.forRoot(Config.get<string>('mongodb.uri'), Config.get<MongooseModuleOptions>('mongodb.options')),
      UserModule,
  ],
})
export class AppModule {}
