import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { IDomainRegistrarModel } from './model/domain-registrar.model';

@Injectable({
  providedIn: 'root'
})
export class DomainRegistrarsApiService extends FleioApiService<IDomainRegistrarModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/domains/registrars'));
  }
}
