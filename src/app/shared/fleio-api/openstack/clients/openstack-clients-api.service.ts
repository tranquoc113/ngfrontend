import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IClientModel } from '../../client-user/model/client.model';

@Injectable({
  providedIn: 'root'
})
export class OpenstackClientsApiService extends FleioApiService<IClientModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/clients'));
  }
}
