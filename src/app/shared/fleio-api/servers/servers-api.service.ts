import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IServerModel } from './model/server.model';
import { FleioApiService } from '../fleio-api.service';
import { ConfigService } from '../../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ServersApiService extends FleioApiService<IServerModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('server'));
  }
}
