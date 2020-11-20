import {Module} from '@nestjs/common';
import { ProcessorModule } from './processor/processor.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import * as Config from 'config';
import {LoginModule} from './login/login.module';

@Module({
  imports: [
      LoginModule,
      //ProcessorModule,
    //MongooseModule.forRoot(Config.get<string>('mongodb.uri'), Config.get<MongooseModuleOptions>('mongodb.options')),
  ],
})
export class AppModule {}
