import { Injectable } from '@nestjs/common';
import {JwtModuleOptions, JwtOptionsFactory, JwtSignOptions} from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory{
    createJwtOptions(): JwtModuleOptions | JwtSignOptions {
        return {
            secret: 'UxhNqZYsDaNz4oiMqTDhN10QItVTR7aNxO9ILAloa89JQ5x0t5OtjiRxyx1ZJeJ',
        };
    }

    createSignOption(): JwtSignOptions{
        return  {
                algorithm: 'HS512', // algo de hashage
                expiresIn: '2h'
                };
    }

}
