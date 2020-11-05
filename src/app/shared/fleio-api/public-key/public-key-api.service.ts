import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPublicKeyModel } from './model/public-key.model';
import { FleioApiService } from '../fleio-api.service';
import { ConfigService } from '../../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class PublicKeysApiService extends FleioApiService<IPublicKeyModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('pkm'));
  }
}
