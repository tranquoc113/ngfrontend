import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IConfigurableOptionCycleModel } from '@fleio-api/billing/model/configurable-option-cycle.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurableOptionsCycleApiService extends FleioApiService<IConfigurableOptionCycleModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('billing/configoptions/cycles'));
  }
}
