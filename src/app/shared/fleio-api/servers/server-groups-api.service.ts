import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../fleio-api.service';
import { ConfigService } from '../../config/config.service';
import { IServerGroupModel } from './model/server-group.model';

@Injectable({
  providedIn: 'root'
})
export class ServerGroupsApiService extends FleioApiService<IServerGroupModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('servergroup'));
  }
}
