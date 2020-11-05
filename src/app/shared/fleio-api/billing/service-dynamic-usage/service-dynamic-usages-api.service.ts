import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IServiceDynamicUsageModel } from '../model/service-dynamic-usage.model';
import { Observable } from 'rxjs';
import { FleioObjectsList } from '../../fleio-objects-list';

@Injectable({
  providedIn: 'root'
})
export class ServiceDynamicUsagesApiService extends FleioApiService<IServiceDynamicUsageModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/billing/usage'));
  }

  getForClient(clientId: number): Observable<FleioObjectsList<IServiceDynamicUsageModel>> {
    return this.list({ client_id: clientId, }, 'client' );
  }
}
