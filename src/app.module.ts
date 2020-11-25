import {Module} from '@nestjs/common';
import { ProcessorModule } from './processor/processor.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import * as Config from 'config';
import { UserModule } from './user/user.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
      ProcessorModule,
      MongooseModule.forRoot(Config.get<string>('mongodb.uri'), Config.get<MongooseModuleOptions>('mongodb.options')),
      UserModule,
      ConfigurationModule,
      ChatModule,
  ],
})
export class AppModule {}
