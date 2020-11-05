import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { ConfigService } from '../../../config/config.service';
import { IPricingRuleModel } from '../model/pricing-rule.model';

@Injectable({
  providedIn: 'root'
})
export class PricingRulesApiService extends FleioApiService<IPricingRuleModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/billing/pricerule'));
  }
}
