import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ConfigurationDao } from '../configuration/dao/configuration.dao';
import { Observable, of, throwError } from 'rxjs';
import { ConfigurationEntity } from '../configuration/entities/configuration.entity';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';

@Injectable()
export class ConfigurationService {
  /**
   * Class constructor
   *
   * @param {ConfigurationDao} _configurationDao instance of the DAO
   */
  constructor(private readonly _configurationDao: ConfigurationDao) {
  }

  /**
   * Returns all existing configuration in the list
   *
   * @returns {Observable<ConfigurationEntity[] | void>}
   */
  findAll(): Observable<ConfigurationEntity[] | void> {
    return this._configurationDao.find()
      .pipe(
        map(_ => !!_ ? _.map(__ => new ConfigurationEntity(__)) : undefined),
      );
  }

  /**
   * Returns randomly one configuration of the list
   *
   * @returns {Observable<ConfigurationEntity | void>}
   */
  findRandom(): Observable<ConfigurationEntity | void> {
    return this._configurationDao.find()
      .pipe(
        map(_ => !!_ ? _[ Math.round(Math.random() * _.length) ] : undefined),
        map(_ => !!_ ? new ConfigurationEntity(_) : undefined),
      );
  }

  /**
   * Returns one configuration of the list matching id in parameter
   *
   * @param {string} id of the configuration
   *
   * @returns {Observable<ConfigurationEntity>}
   */
  findOne(id: string): Observable<ConfigurationEntity> {
    return this._configurationDao.findById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(new ConfigurationEntity(_)) :
            throwError(new NotFoundException(`Configuration with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Check if configuration already exists and add it in configurations list
   *
   * @param configuration to create
   *
   * @returns {Observable<ConfigurationEntity>}
   */
  create(configuration: CreateConfigurationDto): Observable<ConfigurationEntity> {
    return this._addConfiguration(configuration)
      .pipe(
        mergeMap(_ => this._configurationDao.save(_)),
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Configuration with  name '${configuration.name}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new ConfigurationEntity(_)),
      );
  }

  /**
   * Update a configuration in configurations list
   *
   * @param {string} id of the configuration to update
   * @param configuration data to update
   *
   * @returns {Observable<ConfigurationEntity>}
   */
  update(id: string, configuration: UpdateConfigurationDto): Observable<ConfigurationEntity> {
    return this._configurationDao.findByIdAndUpdate(id, configuration)
      .pipe(
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Configuration with  name '${configuration.name}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        mergeMap(_ =>
          !!_ ?
            of(new ConfigurationEntity(_)) :
            throwError(new NotFoundException(`Configuration with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Deletes one configuration in configurations list
   *
   * @param {string} id of the configuration to delete
   *
   * @returns {Observable<void>}
   */
  delete(id: string): Observable<void> {
    return this._configurationDao.findByIdAndRemove(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`Configuration with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Add configuration with good data in configurations list
   *
   * @param configuration to add
   *
   * @returns {Observable<CreateConfigurationDto>}
   *
   * @private
   */
  private _addConfiguration(configuration: CreateConfigurationDto): Observable<CreateConfigurationDto> {
    return of(configuration);
  }
}
