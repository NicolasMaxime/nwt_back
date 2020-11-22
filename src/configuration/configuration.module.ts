import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';
import { Configuration, ConfigurationSchema } from './schemas/configuration.schema';
import { ConfigurationDao } from './dao/configuration.dao';

@Module({
  imports:[ MongooseModule.forFeature([{name: Configuration.name, schema: ConfigurationSchema}])],
  controllers: [ConfigurationController],
  providers: [ConfigurationService,Logger,ConfigurationDao]
})
export class ConfigurationModule {}
