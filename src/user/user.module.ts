import {Logger, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './service/auth/user.service';
import {JwtModule} from '@nestjs/jwt';
import { JwtConfigService } from './service/jwt-config/jwt-config.service';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from './schemas/user.schema';
import {UserAuthDao} from './dao/userAuth.dao';
import {CryptoModule} from '@akanass/nestjsx-crypto';
import {AuthService} from './service/auth/auth.service';

@Module({
    controllers: [
      UserController,
    ],
    imports: [
        JwtModule.registerAsync({
            useClass: JwtConfigService
        }),
        CryptoModule,
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
    ],
    exports: [UserService, JwtConfigService, AuthService],
    providers: [UserService, JwtConfigService, AuthService, UserAuthDao, Logger]
})
export class UserModule {}
