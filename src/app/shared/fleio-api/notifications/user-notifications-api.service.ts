import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INotificationModel } from './model/notification.model';
import { FleioApiService } from '../fleio-api.service';
import { ConfigService } from '../../config/config.service';


@Injectable({
  providedIn: 'root'
})
export class UserNotificationsApiService extends FleioApiService<INotificationModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('notifications'));
  }
}
