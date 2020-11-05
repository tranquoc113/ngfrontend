import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IConfigOptionModel } from '../model/config-option.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurableOptionsApiService extends FleioApiService<IConfigOptionModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('billing/configoptions'));
  }
}
