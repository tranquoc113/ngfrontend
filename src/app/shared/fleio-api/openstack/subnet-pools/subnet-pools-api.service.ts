import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { ISubnetPoolModel } from '@fleio-api/openstack/subnet-pools/model/subnet-pool.model';

@Injectable({
  providedIn: 'root'
})
export class SubnetPoolsApiService extends FleioApiService<ISubnetPoolModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/subnetpools'));
  }
}
