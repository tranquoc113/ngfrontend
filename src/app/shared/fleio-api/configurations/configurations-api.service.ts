import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { FleioApiService } from '../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IConfigurationModel } from './model/configuration.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsApiService extends FleioApiService<IConfigurationModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('configurations'));
  }

  specificConfiguration(id: number, type: string): Observable<IConfigurationModel> {
    return this.objectGetAction(id, type);
  }
}
