import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { FleioId, IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { Observable } from 'rxjs';
import { IDomainAvailabilityInfoModel } from './model/domain-availability-info.model';
import { ICustomFieldsStatusModel } from './model/custom-fields-status.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDomainApiService extends FleioApiService<IBaseFleioObjectModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/domains/order-domain'));
  }

  isAvailableForRegistration(clientId: FleioId, domainName: string): Observable<IDomainAvailabilityInfoModel> {
    return this.getAction('is_available_for_registration', {
      client_id: clientId,
      domain_name: domainName,
    });
  }

  checkCustomFields(clientId: FleioId, contactId: FleioId, domainName: string): Observable<ICustomFieldsStatusModel> {
    return this.getAction('check_custom_fields', {
      client_id: clientId,
      contact_id: contactId,
      contact_type: contactId ? 'contact' : 'client',
      domain_name: domainName,
    });
  }

  registerDomain(domainData: any): Observable<{ order_id: number }> {
    domainData.operation = 'register';
    return this.postAction('register_domain', {
      action: 'register_domain',
      domain: domainData,
    })
  }

  transferDomain(domainData: any): Observable<{ order_id: number }> {
    domainData.operation = 'transfer';
    return this.postAction('transfer_domain', {
      action: 'transfer_domain',
      domain: domainData,
    })
  }
}
