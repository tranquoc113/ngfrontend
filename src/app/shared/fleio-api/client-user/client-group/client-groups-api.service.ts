import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IClientGroupModel } from '../model/client-group.model';

@Injectable({
  providedIn: 'root'
})
export class ClientGroupsApiService extends FleioApiService<IClientGroupModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('clientgroups'));
  }
}
