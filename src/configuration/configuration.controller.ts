import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import {
  ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse, ApiParam, ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { ConfigurationEntity } from './entities/configuration.entity';
import { HandlerParams } from '../processor/validators/handler-params';
import { ConfigurationInterceptor } from './interceptors/configuration.interceptor';

@ApiTags('configuration')
@Controller('configuration')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(ConfigurationInterceptor)
export class ConfigurationController {
  /**
   * Constructor of ConfigurationController
   * @param _configurationService
   */
  constructor(private _configurationService: ConfigurationService) {
  }

  /**
   * Handler to answer to GET /configuration/all route
   *
   * @returns Observable<ConfigurationEntity[] | void>
   */
  @ApiOkResponse({ description: 'Returns an array of configuration', type: ConfigurationEntity, isArray: true })
  @ApiNoContentResponse({ description: 'No configuration exists in database' })
  @Get('all')
  findAll(): Observable<ConfigurationEntity[] | void> {
    return this._configurationService.findAll();
  }

  /**
   * Handler to answer to GET /configuration/random route
   *
   * @returns Observable<ConfigurationEntity | void>
   */
  @ApiOkResponse({ description: 'Returns one configuration randomly', type: ConfigurationEntity })
  @ApiNoContentResponse({ description: 'No configuration exists in database' })
  @Get('random')
  findRandom(): Observable<ConfigurationEntity | void> {
    return this._configurationService.findRandom();
  }

  /**
   * Handler to answer to GET /configuration/:id route
   *
   * @param {HandlerParams} params list of route params to take configuration id
   *
   * @returns Observable<ConfigurationEntity>
   */
  @ApiOkResponse({ description: 'Returns the configuration for the given "id"', type: ConfigurationEntity })
  @ApiNotFoundResponse({ description: 'Configuration with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the configuration in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<ConfigurationEntity> {
    return this._configurationService.findOne(params.id);
  }

  /**
   * Handler to answer to POST /configuration route
   *
   * @param createConfigurationDto data to create
   *
   * @returns Observable<ConfigurationEntity>
   */
  @ApiCreatedResponse({ description: 'The configuration has been successfully created', type: ConfigurationEntity })
  @ApiConflictResponse({ description: 'The configuration already exists in the database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiBody({ description: 'Payload to create a new configuration', type: CreateConfigurationDto })
  @Post()
  create(@Body() createConfigurationDto: CreateConfigurationDto): Observable<ConfigurationEntity> {
    return this._configurationService.create(createConfigurationDto);
  }

  /**
   * Handler to answer to PUT /configuration/:id route
   *
   * @param {HandlerParams} params list of route params to take configuration id
   * @param updateConfigurationDto data to update
   *
   * @returns Observable<ConfigurationEntity>
   */
  @ApiOkResponse({ description: 'The configuration has been successfully updated', type: ConfigurationEntity })
  @ApiNotFoundResponse({ description: 'Configuration with the given "id" doesn\'t exist in the database' })
  @ApiConflictResponse({ description: 'The configuration already exists in the database' })
  @ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the configuration in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a configuration', type: UpdateConfigurationDto })
  @Put(':id')
  update(@Param() params: HandlerParams, @Body() updateConfigurationDto: UpdateConfigurationDto): Observable<ConfigurationEntity> {
    return this._configurationService.update(params.id, updateConfigurationDto);
  }

  /**
   * Handler to answer to DELETE /configuration/:id route
   *
   * @param {HandlerParams} params list of route params to take configuration id
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({ description: 'The configuration has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Configuration with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the configuration in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._configurationService.delete(params.id);
  }
}
