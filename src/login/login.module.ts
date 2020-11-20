import {Logger, Module} from '@nestjs/common';
import { LoginController } from './login.controller';
import { AuthService } from './service/auth/auth.service';
import {JwtModule} from '@nestjs/jwt';
import { JwtConfigService } from './service/jwt-config/jwt-config.service';

@Module({
    controllers: [
      LoginController,
    ],
    imports: [
        JwtModule.registerAsync({
            useClass: JwtConfigService
        }),
    ],
    providers: [AuthService, JwtConfigService]
})
export class LoginModule {}
