import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IServiceDynamicUsageModel } from '../model/service-dynamic-usage.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceDynamicUsageHistoryApiService extends FleioApiService<IServiceDynamicUsageModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/billing/usage'));
  }
}
