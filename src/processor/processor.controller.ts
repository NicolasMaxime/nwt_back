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
import { ProcessorInterceptor } from './interceptors/processor.interceptor';
import { ProcessorService } from './processor.service';
import { Observable } from 'rxjs';
import { ProcessorEntity } from './entities/processor.entity';
import { HandlerParams } from './validators/handler-params';
import {
  ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse, ApiParam, ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateProcessorDto } from './dto/create-processor.dto';
import { UpdateProcessorDto } from './dto/update-processor.dto';

@ApiTags('processor')
@Controller('processor')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(ProcessorInterceptor)
export class ProcessorController {
  /**
   * Class constructor
   * @param _processorService
   */
  constructor(private readonly _processorService: ProcessorService) {
  }

  /**
   * Handler to answer to GET /processor/all route
   *
   * @returns Observable<ProcessorEntity[] | void>
   */
  @ApiOkResponse({ description: 'Returns an array of processor', type: ProcessorEntity, isArray: true })
  @ApiNoContentResponse({ description: 'No processor exists in database' })
  @Get('all')
  findAll(): Observable<ProcessorEntity[] | void> {
    return this._processorService.findAll();
  }

  /**
   * Handler to answer to GET /processor/random route
   *
   * @returns Observable<ProcessorEntity | void>
   */
  @ApiOkResponse({ description: 'Returns one processor randomly', type: ProcessorEntity })
  @ApiNoContentResponse({ description: 'No processor exists in database' })
  @Get('random')
  findRandom(): Observable<ProcessorEntity | void> {
    return this._processorService.findRandom();
  }

  /**
   * Handler to answer to GET /processor/:id route
   *
   * @param {HandlerParams} params list of route params to take processor id
   *
   * @returns Observable<ProcessorEntity>
   */
  @ApiOkResponse({ description: 'Returns the processor for the given "id"', type: ProcessorEntity })
  @ApiNotFoundResponse({ description: 'Processor with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the processor in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<ProcessorEntity> {
    return this._processorService.findOne(params.id);
  }

  /**
   * Handler to answer to POST /processor route
   *
   * @param createProcessorDto data to create
   *
   * @returns Observable<ProcessorEntity>
   */
  @ApiCreatedResponse({ description: 'The processor has been successfully created', type: ProcessorEntity })
  @ApiConflictResponse({ description: 'The processor already exists in the database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiBody({ description: 'Payload to create a new processor', type: CreateProcessorDto })
  @Post()
  create(@Body() createProcessorDto: CreateProcessorDto): Observable<ProcessorEntity> {
    return this._processorService.create(createProcessorDto);
  }

  /**
   * Handler to answer to PUT /processor/:id route
   *
   * @param {HandlerParams} params list of route params to take processor id
   * @param updateProcessorDto data to update
   *
   * @returns Observable<ProcessorEntity>
   */
  @ApiOkResponse({ description: 'The processor has been successfully updated', type: ProcessorEntity })
  @ApiNotFoundResponse({ description: 'Processor with the given "id" doesn\'t exist in the database' })
  @ApiConflictResponse({ description: 'The processor already exists in the database' })
  @ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the processor in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a processor', type: UpdateProcessorDto })
  @Put(':id')
  update(@Param() params: HandlerParams, @Body() updateProcessorDto: UpdateProcessorDto): Observable<ProcessorEntity> {
    return this._processorService.update(params.id, updateProcessorDto);
  }

  /**
   * Handler to answer to DELETE /processor/:id route
   *
   * @param {HandlerParams} params list of route params to take processor id
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({ description: 'The processor has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Processor with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the processor in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._processorService.delete(params.id);
  }
}
