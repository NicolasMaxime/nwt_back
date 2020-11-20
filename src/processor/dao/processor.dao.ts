import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Processor } from '../schemas/processor.schema';
import { Model, MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProcessorDao {
  /**
   * Class constructor
   *
   * @param _processorModel
   */
  constructor(@InjectModel(Processor.name) private readonly _processorModel: Model<Processor>) {
  }

  /**
   * Call mongoose method, call toJSON on each result and returns Processor[] or undefined
   *
   * @return {Observable<Processor[] | void>}
   */
  find(): Observable<Processor[] | void> {
    return from(this._processorModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  /**
   * Returns one processor of the list matching id in parameter
   *
   * @param {string} id of the processor in the db
   *
   * @return {Observable<Processor | void>}
   */
  findById(id: string): Observable<Processor | void> {
    return from(this._processorModel.findById(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

}
