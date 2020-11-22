import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseDocument } from 'mongoose';
import { Configuration } from '../schemas/configuration.schema';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Processor } from '../../processor/schemas/processor.schema';
import { CreateConfigurationDto } from '../dto/create-configuration.dto';
import { UpdateConfigurationDto } from '../dto/update-configuration.dto';

@Injectable()
export class ConfigurationDao {
  /**
   * Class constructor
   *
   * @param _configurationModel
   */
  constructor(@InjectModel(Configuration.name) private readonly _configurationModel: Model<Configuration>) {
  }

  /**
   * Call mongoose method, call toJSON on each result and returns Configuration[] or undefined
   *
   * @return {Observable<Processor[] | void>}
   */
  find(): Observable<Configuration[] | void> {
    return from(this._configurationModel.find({}))
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
  findById(id: string): Observable<Configuration | void> {
    return from(this._configurationModel.findById(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Check if configuration already exists with index and add it in configurations list
   *
   * @param {CreateConfigurationDto} configuration to create
   *
   * @return {Observable<Configuration>}
   */
  save(configuration: CreateConfigurationDto): Observable<Configuration> {
    return from(new this._configurationModel(configuration).save())
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }


  /**
   * Update a configuration in configurations list
   *
   * @param {string} id
   * @param {UpdateConfigurationDto} configuration
   *
   * @return {Observable<Configuration | void>}
   */
  findByIdAndUpdate(id: string, configuration: UpdateConfigurationDto): Observable<Configuration | void> {
    return from(this._configurationModel.findByIdAndUpdate(id, configuration, { new: true, runValidators: true }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Delete a configuration in configurations list
   *
   * @param {string} id
   *
   * @return {Observable<Configuration | void>}
   */
  findByIdAndRemove(id: string): Observable<Configuration | void> {
    return from(this._configurationModel.findByIdAndRemove(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }
}
