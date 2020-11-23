import {Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import {VerifLoginDto} from './dto/verif-login.dto';
import {UserService} from './service/auth/user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {Observable} from 'rxjs';
import {HandlerParams} from './validators/handler-params';
import {UserEntity} from './entities/user.entity';
import {AuthGuardGet} from "./guards/auth.guard";

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

    /**
     * Constructor of UserController
     * @param _userService
     */
    constructor(private _userService: UserService) {
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

    /**
     * GET route to fetch all user
     */

    @Get('all')
    allUsers(): Observable<UserEntity[] | void>{
        return this._userService.findAll();
    }

    /**
     * GET route to fetch all user
     */
    @Get(':login')
    @UseGuards(AuthGuardGet)
    getOne(@Param() params: HandlerParams): Observable<UserEntity | void>{
        return this._userService.findOne(params.login);
    }


}
