import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { IDomainContactModel } from './model/domain-contact.model';

@Injectable({
  providedIn: 'root'
})
export class DomainContactsApiService extends FleioApiService<IDomainContactModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/domains/contacts'));
  }
}
