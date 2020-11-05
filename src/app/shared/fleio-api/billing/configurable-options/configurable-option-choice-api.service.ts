import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IConfigurableOptionChoiceModel } from '@fleio-api/billing/model/configurable-option-choice.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurableOptionsChoiceApiService extends FleioApiService<IConfigurableOptionChoiceModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('billing/configoptions/choices'));
  }
}
