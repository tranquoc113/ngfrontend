import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IRegionModel } from '../model/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionsApiService extends FleioApiService<IRegionModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/regions'));
  }
}
