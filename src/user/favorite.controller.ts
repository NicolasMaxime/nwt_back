import {Body, Controller, Param, Put, UseGuards} from "@nestjs/common";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {HandlerParams} from "./validators/handler-params";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Observable} from "rxjs";
import {UserEntity} from "./entities/user.entity";
import {UserService} from "./service/auth/user.service";
import {AuthGuardGet} from "./guards/auth.guard";

@Controller('favorite')
@ApiTags('favorite')
export class FavoriteController {
    constructor(private _userService: UserService) {
    }

    @ApiBody({ description: 'Update favorites of a user', type: UpdateUserDto })
    @UseGuards(AuthGuardGet)
    @Put(':login')
    updateFavorite(@Param() params: HandlerParams, @Body() user: UpdateUserDto): Observable<UserEntity>{
        return this._userService.updateFavorite(user, params.login);
    }
}
