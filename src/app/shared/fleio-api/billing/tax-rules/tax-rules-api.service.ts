import { Injectable } from '@angular/core';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@shared/config/config.service';
import { ITaxRuleModel } from '@fleio-api/billing/model/tax-rule.model';


@Injectable({
  providedIn: 'root'
})
export class TaxRulesApiService extends FleioApiService<ITaxRuleModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('billing/taxrules'));
  }
}
