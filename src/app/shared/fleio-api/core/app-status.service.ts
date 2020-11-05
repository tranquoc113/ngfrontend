import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { FleioApiService } from '../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IAppStatus } from '@fleio-api/core/model/app-status.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppStatusService extends FleioApiService<IAppStatus> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('app-status'));
  }

  getAppStatus(): Observable<Array<IAppStatus>> {
    return this.list() as any;
  }
}
