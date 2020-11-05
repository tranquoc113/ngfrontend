import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { FleioApiService } from '../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppServicesStatusService extends FleioApiService<any> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('services-statuses'));
  }

  getServicesStatuses(): Observable<{
    [key: string]: boolean;
  }> {
    return this.list() as any;
  }
}
