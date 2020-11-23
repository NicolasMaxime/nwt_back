import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Processor } from '../schemas/processor.schema';
import { Model, MongooseDocument } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateConfigurationDto } from '../../configuration/dto/create-configuration.dto';
import { Configuration } from '../../configuration/schemas/configuration.schema';
import { CreateProcessorDto } from '../dto/create-processor.dto';
import { UpdateConfigurationDto } from '../../configuration/dto/update-configuration.dto';
import { UpdateProcessorDto } from '../dto/update-processor.dto';

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

  /**
   * Check if processor already exists with index and add it in processors list
   *
   * @param {CreateProcessorDto} configuration to create
   *
   * @return {Observable<Processor>}
   */
  save(processor: CreateProcessorDto): Observable<Processor> {
    return from(new this._processorModel(processor).save())
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }

  /**
   * Update a processor in processors list
   *
   * @param {string} id
   * @param {UpdateProcessorDto} processor
   *
   * @return {Observable<Processor | void>}
   */
  findByIdAndUpdate(id: string, processor: UpdateProcessorDto): Observable<Processor | void> {
    return from(this._processorModel.findByIdAndUpdate(id, processor, { new: true, runValidators: true }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Delete a processor in processors list
   *
   * @param {string} id
   *
   * @return {Observable<Processor | void>}
   */
  findByIdAndRemove(id: string): Observable<Processor | void> {
    return from(this._processorModel.findByIdAndRemove(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

}
