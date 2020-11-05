import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { HttpClient } from '@angular/common/http';
import { IDomainModel } from './model/domain.model';
import { FleioApiService } from '../../fleio-api.service';
import { FleioId } from '../../base-model/base-fleio-object.model';
import { Observable } from 'rxjs';
import { IDomainInfoModel } from './model/domain-info.model';
import { IDomainActionResultModel } from './model/domain-action-result.model';

@Injectable({
  providedIn: 'root'
})
export class DomainApiService extends FleioApiService<IDomainModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/domains/domains'));
  }

  saveNameservers(domainId: FleioId, nameservers: any) {
    return this.objectPostAction(domainId, 'save_nameservers', nameservers)
  }

  getInfo(domainId: FleioId, registrarId: FleioId): Observable<IDomainInfoModel> {
    return this.objectGetAction(domainId, 'get_info', {registrar_id: registrarId});
  }

  executeAction(domainId: FleioId, domainAction: string, registrarId: FleioId): Observable<IDomainActionResultModel> {
    return this.objectPostAction(domainId, 'execute_action', {
      action: 'execute_action',
      domain_action: domainAction,
      id: domainId,
      registrar_id: registrarId,
    })
  }

  getClientDomains(clientId: FleioId, page: number): Observable<any> {
    return this.getAction('get_client_domains', {
      client_id: clientId,
      page
    });
  }
}
