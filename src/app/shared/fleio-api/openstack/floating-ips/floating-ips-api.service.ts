import { Injectable } from '@angular/core';
import { IFloatingIpModel } from '@fleio-api/openstack/floating-ips/model/floating-ip.model';
import { FleioApiService } from '@fleio-api/fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class FloatingIpsApiService extends FleioApiService<IFloatingIpModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/floatingips'));
  }
}
