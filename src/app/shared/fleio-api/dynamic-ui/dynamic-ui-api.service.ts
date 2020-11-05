import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../fleio-api.service';
import { ConfigService } from '../../config/config.service';


@Injectable({
  providedIn: 'root'
})
export class DynamicUiApiService extends FleioApiService<any> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('dynamic-ui'));
  }
}
