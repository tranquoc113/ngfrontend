import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IPortModel } from '../model/port.model';

@Injectable({
  providedIn: 'root'
})
export class PortsApiService extends FleioApiService<IPortModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/ports'));
  }
}
