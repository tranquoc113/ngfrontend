import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { FleioApiService } from '../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IPluginModel } from './model/plugin.model';
import { Observable } from 'rxjs';
import { IPluginsWithNotificationsModel } from './model/plugins-with-notifications.model';

@Injectable({
  providedIn: 'root'
})
export class PluginsApiService extends FleioApiService<IPluginModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins'));
  }

  pluginsWithNotifications(): Observable<IPluginsWithNotificationsModel> {
    return this.getAction('plugins_with_notifications');
  }
}
