import {Logger, Module} from '@nestjs/common';
import { LoginController } from './login.controller';
import { AuthService } from './service/auth/auth.service';
import {JwtModule} from '@nestjs/jwt';
import { JwtConfigService } from './service/jwt-config/jwt-config.service';
import {MongooseModule} from '@nestjs/mongoose';
import {Processor, ProcessorSchema} from '../processor/schemas/processor.schema';
import {User, UserSchema} from './schemas/user.schema';
import {UserDao} from './dao/user.dao';
import {CryptoModule} from '@akanass/nestjsx-crypto';

@Module({
    controllers: [
      LoginController,
    ],
    imports: [
        JwtModule.registerAsync({
            useClass: JwtConfigService
        }),
        CryptoModule,
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
    ],
    providers: [AuthService, JwtConfigService, UserDao]
})
export class LoginModule {}
