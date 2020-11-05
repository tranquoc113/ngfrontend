import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IActivityLogModel } from '../model/activity-log.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogApiService extends FleioApiService<IActivityLogModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('activitylog'));
  }
}
