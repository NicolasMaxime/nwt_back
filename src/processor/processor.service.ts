import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { ProcessorEntity } from './entities/processor.entity';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProcessorDao } from './dao/processor.dao';
import { CreateConfigurationDto } from '../configuration/dto/create-configuration.dto';
import { ConfigurationEntity } from '../configuration/entities/configuration.entity';
import { CreateProcessorDto } from './dto/create-processor.dto';
import { UpdateConfigurationDto } from '../configuration/dto/update-configuration.dto';
import { UpdateProcessorDto } from './dto/update-processor.dto';

@Injectable()
export class ProcessorService {
  /**
   * Class constructor
   *
   * @param {ProcessorDao} _processorDao instance of the DAO
   */
  constructor(private readonly _processorDao: ProcessorDao) {
  }

  /**
   * Returns all existing processor in the list
   *
   * @returns {Observable<ProcessorEntity[] | void>}
   */
  findAll(): Observable<ProcessorEntity[] | void> {
    return this._processorDao.find()
      .pipe(
        map(_ => !!_ ? _.map(__ => new ProcessorEntity(__)) : undefined),
      );
  }

  /**
   * Returns randomly one processor of the list
   *
   * @returns {Observable<ProcessorEntity | void>}
   */
  findRandom(): Observable<ProcessorEntity | void> {
    return this._processorDao.find()
      .pipe(
        map(_ => !!_ ? _[ Math.round(Math.random() * _.length) ] : undefined),
        map(_ => !!_ ? new ProcessorEntity(_) : undefined),
      );
  }

  /**
   * Returns one processor of the list matching id in parameter
   *
   * @param {string} id of the processor
   *
   * @returns {Observable<ProcessorEntity>}
   */
  findOne(id: string): Observable<ProcessorEntity> {
    return this._processorDao.findById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(new ProcessorEntity(_)) :
            throwError(new NotFoundException(`Processor with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Check if processor already exists and add it in processors list
   *
   * @param processor to create
   *
   * @returns {Observable<ProcessorEntity>}
   */
  create(processor: CreateProcessorDto): Observable<ProcessorEntity> {
    return this._addProcessor(processor)
      .pipe(
        mergeMap(_ => this._processorDao.save(_)),
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Processor with model name '${processor.modelName}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new ProcessorEntity(_)),
      );
  }

  /**
   * Update a processor in processor_ list
   *
   * @param {string} id of the processor to update
   * @param processor data to update
   *
   * @returns {Observable<ProcessorEntity>}
   */
  update(id: string, processor: UpdateProcessorDto): Observable<ProcessorEntity> {
    return this._processorDao.findByIdAndUpdate(id, processor)
      .pipe(
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Processor with model name '${processor.modelName}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        mergeMap(_ =>
          !!_ ?
            of(new ProcessorEntity(_)) :
            throwError(new NotFoundException(`Processor with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Deletes one processor in processors list
   *
   * @param {string} id of the processor to delete
   *
   * @returns {Observable<void>}
   */
  delete(id: string): Observable<void> {
    return this._processorDao.findByIdAndRemove(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`Processor with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Add processor with good data in processors list
   *
   * @param processor to add
   *
   * @returns {Observable<CreateProcessorDto>}
   *
   * @private
   */
  private _addProcessor(processor: CreateProcessorDto): Observable<CreateProcessorDto> {
    return of(processor);
  }

}
