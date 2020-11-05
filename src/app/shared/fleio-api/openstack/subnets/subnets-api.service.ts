import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { ISubnetModel } from '@fleio-api/openstack/model/subnet.model';

@Injectable({
  providedIn: 'root'
})
export class SubnetsApiService extends FleioApiService<ISubnetModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/subnets'));
  }
}
