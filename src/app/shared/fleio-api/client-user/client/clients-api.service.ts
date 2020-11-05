import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IClientModel } from '../model/client.model';
import { Observable } from 'rxjs';
import { FleioId } from '../../base-model/base-fleio-object.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsApiService extends FleioApiService<IClientModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('clients'));
  }

  updateUsage(clientId: FleioId): Observable<any> {
    return this.objectPostAction(clientId, 'update_usage', {});
  }

  resetUsage(clientId: FleioId): Observable<any> {
    return this.objectPostAction(clientId, 'reset_usage', {});
  }

  changeResellerPricingPlan(clientId: FleioId, planId: FleioId, serviceId: FleioId): Observable<any> {
    return this.objectPostAction(clientId, 'update_reseller_billing_plan', {
      plan: planId,
      service: serviceId,
    });
  }

  changeResellerPanelUrl(clientId: FleioId, enduserPanelUrl: string, serviceId: FleioId): Observable<any> {
    return this.objectPostAction(clientId, 'update_reseller_enduser_panel_url', {
      enduser_panel_url: enduserPanelUrl,
      service: serviceId,
    });
  }

  createResellerService(clientId: FleioId, productId: FleioId, productCycleId: FleioId): Observable<any> {
    return this.objectPostAction(clientId, 'create_reseller_service', {
      product_id: productId,
      product_cycle_id: productCycleId,
    });
  }

  changeCredit(
    clientId: FleioId,
    addCredit: boolean,
    amount: number,
    sourceCurrency: string,
    currency: string
  ): Observable<any> {
    return this.objectPostAction(clientId, 'change_credit', {
      add_credit: addCredit,
      amount,
      source_currency: sourceCurrency,
      currency
    });
  }

  resellerServices(clientId: FleioId): Observable<any> {
    return this.objectGetAction(clientId, 'reseller_services', {});
  }

  getCloudSummary(clientId: FleioId): Observable<any> {
    return this.objectGetAction(clientId, 'get_cloud_summary', {});
  }

  getUsers(clientId: FleioId): Observable<any> {
    return this.objectGetAction(clientId, 'get_users', {});
  }

  sendMassEmail(formData: FormData) {
    return this.createWithUpload(formData, 'send_mass_email');
  }

  withResellerService(search: string) {
    const queryParams = {
      has_reseller_service: true
    }
    if (search) {
      // @ts-ignore
      queryParams.search = search;
    }
    return this.list(queryParams);
  }

  addToGroup(
    objectId: FleioId,
    groupId: FleioId
  ): Observable<any> {
    return this.objectPostAction(objectId, `add_to_group`, {group_id: groupId});
  }

  removeFromGroup(
    objectId: FleioId,
    groupId: FleioId
  ): Observable<any> {
    return this.objectPostAction(objectId, `remove_from_group`, {group_id: groupId});
  }

  getClientsInGroup(groupId: FleioId, page: number): Observable<any> {
    return this.getAction('get_clients_in_group', {
      group_id: groupId,
      page
    });
  }

  getAvailableClientsForGroup(groupId: FleioId, search: string): Observable<any> {
    return this.getAction('get_available_clients_for_group', {
      group: groupId,
      search,
    });
  }

}
