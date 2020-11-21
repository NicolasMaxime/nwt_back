import {Body, ClassSerializerInterceptor, Controller, Delete, Get, Post, UseInterceptors} from '@nestjs/common';
import {VerifLoginDto} from './dto/verif-login.dto';
import {AuthService} from './service/auth/auth.service';
import {CreateUserDto} from './dto/create-user.dto';
import {Observable} from 'rxjs';
import {UserEntity} from './entity/UserEntity';
import {UserDao} from './dao/user.dao';

@Controller('login')
@UseInterceptors(ClassSerializerInterceptor)
export class LoginController {

    /**
     * Constructor of LoginController
     * @param _auth
     */
    constructor(private _auth: AuthService) {
    }

    /**
     * GET route to fetch all user
     */
    @Get('all')
    getallUsers() : Observable<UserEntity[] | void>{
        return this._auth.findAll();
    }

    /**
     *  To verify if user is in database and assign him a token
     * @param loginToVerify
     */
    @Post('verify')
    login(@Body() loginToVerify: VerifLoginDto): Observable<UserEntity | void>{
        return this._auth.verifLogin(loginToVerify);
    }

    /**
     * For inscription in the site
     * @param user
     */
    @Post('create')
    createUser(@Body() user: CreateUserDto) : Observable<UserEntity | void>{
        return this._auth.createLogin(user)
    }
}
