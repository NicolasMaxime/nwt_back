import {Body, ClassSerializerInterceptor, Controller, Delete, Get, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import {VerifLoginDto} from './dto/verif-login.dto';
import {UserService} from './service/auth/user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {Observable} from 'rxjs';
import {UserEntity} from './entity/UserEntity';
import {UserDao} from './dao/user.dao';
import {AuthGuard} from './guards/auth.guard';

@Controller('login')
@UseInterceptors(ClassSerializerInterceptor)
export class LoginController {

    /**
     * Constructor of LoginController
     * @param _userService
     */
    constructor(private _userService: UserService) {
    }

    /**
     * GET route to fetch all user
     */
    @Get('all')
    @UseGuards(AuthGuard)
    getallUsers() : Observable<UserEntity[] | void>{
        return this._userService.findAll();
    }

    /**
     *  To verify if user is in database and assign him a token
     * @param loginToVerify
     */
    @Post('verify')
    login(@Body() loginToVerify: VerifLoginDto): Observable<UserEntity | void>{
        return this._userService.verifLogin(loginToVerify);
    }

    /**
     * For inscription in the site
     * @param user
     */
    @Post('create')
    createUser(@Body() user: CreateUserDto) : Observable<UserEntity | void>{
        return this._userService.createLogin(user)
    }

}
