import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {VerifLoginDto} from './dto/verif-login.dto';
import {AuthService} from './service/auth/auth.service';
import {CreateUserDto} from './dto/create-user.dto';
import {Observable} from 'rxjs';
import {User} from './user.interface';

@Controller('login')
export class LoginController {

    constructor(private _auth: AuthService) {
    }

    @Get('all')
    getallUsers() : Observable<User[]>{
        return this._auth.findall();
    }
    
    @Post('verify')
    login(@Body() loginToVerify: VerifLoginDto): Observable<User>{
        return this._auth.verifLogin(loginToVerify);
    }

    @Post('create')
    createUser(@Body() user: CreateUserDto) : Observable<User>{
        return this._auth.createLogin(user)
    }
}
