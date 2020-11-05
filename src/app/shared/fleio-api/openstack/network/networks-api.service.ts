import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { Observable } from 'rxjs';
import { IAutoCreateNetworkOptionsModel } from '@fleio-api/openstack/network/model/auto-create-network-options.model';

@Injectable({
  providedIn: 'root'
})
export class NetworksApiService extends FleioApiService<INetworkModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/networks'));
  }

  autoCreateNetwork(clientId: FleioId, regionId: FleioId): Observable<any> {
    return this.postAction('auto_create_network', {
      admin_state_up: true,
      client: clientId,
      region: regionId,
    })
  }

  getAutoCreateNetworkOptions(regionId: FleioId): Observable<IAutoCreateNetworkOptionsModel> {
    return this.getAction('config_auto_create_network_options', {region: regionId});
  }

  saveAutoCreateNetworkOptions(options: any): Observable<any>{
    return this.postAction('save_auto_create_network_options', options);
  }
}
