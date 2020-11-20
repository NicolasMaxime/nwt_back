import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { ProcessorEntity } from './entities/processor.entity';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProcessorDao } from './dao/processor.dao';

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


}
