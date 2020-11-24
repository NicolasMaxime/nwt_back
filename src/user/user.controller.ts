import {Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors} from '@nestjs/common';
import {VerifLoginDto} from './dto/verif-login.dto';
import {UserService} from './service/auth/user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {Observable} from 'rxjs';
import {HandlerParams} from './validators/handler-params';
import {UserEntity} from './entities/user.entity';
import {AuthGuardGet} from "./guards/auth.guard";
import {UpdateUserDto} from './dto/update-user.dto';
import {
    ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse, ApiParam,
    ApiTags, ApiUnprocessableEntityResponse
} from "@nestjs/swagger";

@Controller('user')
@ApiTags('user')
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
    @ApiCreatedResponse({ description: 'The user has been successfully created', type: UserEntity })
    @ApiConflictResponse({ description: 'The user already exists in the database' })
    @ApiBadRequestResponse({ description: 'Payload provided is not good' })
    @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
    @ApiBody({ description: 'Payload to create a new person', type: CreateUserDto })
    @Post('create')
    createUser(@Body() user: CreateUserDto) : Observable<UserEntity | void>{
        return this._userService.createLogin(user)
    }

    /**
     * GET route to fetch all user
     */
    @ApiOkResponse({ description: 'Returns an array of person', type: UserEntity, isArray: true })
    @ApiNoContentResponse({ description: 'No users exists in database' })
    @Get('all')
    allUsers(): Observable<UserEntity[] | void>{
        return this._userService.findAll();
    }

    /**
     * GET route to fetch all user
     */
    @ApiOkResponse({ description: 'Returns the user for the given "login"', type: UserEntity })
    @ApiNotFoundResponse({ description: 'Person with the given "login" doesn\'t exist in the database' })
    @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
    @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
    @ApiParam({
        name: 'login',
        description: 'Unique identifier of the user in the database',
        type: String,
        allowEmptyValue: false,
    })
    @UseGuards(AuthGuardGet)
    @Get(':login')
    getOne(@Param() params: HandlerParams): Observable<UserEntity | void>{
        return this._userService.findOne(params.login);
    }

    @ApiOkResponse({ description: 'The user has been successfully updated', type: UserEntity })
    @ApiNotFoundResponse({ description: 'Person with the given "id" doesn\'t exist in the database' })
    @ApiConflictResponse({ description: 'The person already exists in the database' })
    @ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' })
    @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
    @ApiParam({
        name: 'login',
        description: 'Unique identifier of the person in the database',
        type: String,
        allowEmptyValue: false,
    })
    @ApiBody({ description: 'Payload to update a user', type: UpdateUserDto })
    @Put(':login')
    @UseGuards(AuthGuardGet)
    update(@Param() params: HandlerParams, @Body() user: UpdateUserDto): Observable<UserEntity>{
        return this._userService.update(user, params.login);
    }

    @ApiNoContentResponse({ description: 'The user has been successfully deleted' })
    @ApiNotFoundResponse({ description: 'Person with the given "login" doesn\'t exist in the database' })
    @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
    @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
    @ApiParam({
        name: 'login',
        description: 'Unique identifier of the user in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Delete(':login')
    @UseGuards(AuthGuardGet)
    delete(@Param() params: HandlerParams): Observable<void>{
        return this._userService.delete(params.login);
    }

}
