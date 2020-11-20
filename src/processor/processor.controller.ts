import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ProcessorInterceptor } from './interceptors/processor.interceptor';
import { ProcessorService } from './processor.service';
import { Observable } from 'rxjs';
import { ProcessorEntity } from './entities/processor.entity';
import { HandlerParams } from './validators/handler-params';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse, ApiParam,
  ApiTags, ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';


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
   * Handler to answer to GET /processor route
   *
   * @returns Observable<ProcessorEntity[] | void>
   */
  @ApiOkResponse({ description: 'Returns an array of processor', type: ProcessorEntity, isArray: true })
  @ApiNoContentResponse({ description: 'No processor exists in database' })
  @Get()
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
}
