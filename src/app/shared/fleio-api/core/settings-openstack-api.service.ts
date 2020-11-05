import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { FleioApiService } from '../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseFleioObjectModel } from '../base-model/base-fleio-object.model';
import { map } from 'rxjs/operators';
import { IServiceVersionsModel } from './model/service-versions.model';
import { IOpenstackDefaultsModel } from './model/openstack-defaults.model';
import { IOpenstackNotificationsModel } from './model/openstack-notifications.model';
import { IOpenstackNotificationsTestResultsModel } from './model/openstack-notifications-test-results.model';
import { IOpenstackCredentialsModel } from './model/openstack-credentials.model';
import { IResponseWithDetailModel } from '../base-model/response-with-detail.model';
import { IVolumeSizesModel } from '@fleio-api/core/model/volume-sizes.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsOpenstackApiService extends FleioApiService<IBaseFleioObjectModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('settings/openstack'));
  }

  getServicesVersions(): Observable<{ [key: string]: IServiceVersionsModel; }> {
    return this.getAction('services').pipe(map(response => response.available_service_versions));
  }

  getVolumeSizes(): Observable<IVolumeSizesModel> {
    return this.getAction('volume_size_increments');
  }

  saveVolumeSizes(
    volumeSizes: IVolumeSizesModel,
  ): Observable<any> {
    return this.postAction('volume_size_increments', volumeSizes);
  }

  getDefaults(): Observable<IOpenstackDefaultsModel> {
    return this.getAction('defaults');
  }

  saveDefaults(defaults: IOpenstackDefaultsModel): Observable<any> {
    return this.postAction('defaults', defaults);
  }

  getNotifications(): Observable<IOpenstackNotificationsModel> {
    return this.getAction('notifications');
  }

  saveNotifications(notifications: IOpenstackNotificationsModel): Observable<any> {
    return this.postAction('notifications', notifications);
  }

  testNotifications(notifications: IOpenstackNotificationsModel): Observable<IOpenstackNotificationsTestResultsModel> {
    return this.postAction('test-notifications-connections', notifications);
  }

  getCredentials(): Observable<IOpenstackCredentialsModel> {
    return this.getAction();
  }

  saveCredentials(credentials: IOpenstackCredentialsModel): Observable<any> {
    return this.postAction(null, credentials);
  }

  testCredentials(credentials: IOpenstackCredentialsModel): Observable<IResponseWithDetailModel> {
    return this.postAction('test_connection', credentials);
  }
}
