import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IGatewayModel } from '../model/gateway.model';
import { ITransactionActionModel } from '../model/transaction-action.model';


@Injectable({
  providedIn: 'root'
})
export class GatewayApiService extends FleioApiService<IGatewayModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('billing/gateways'));
  }

  callAction(action: ITransactionActionModel, invoiceId, transactionId) {
    return this.objectPostAction(action.gateway, action.name, {
      invoice: invoiceId,
      transaction: transactionId,
    });
  }

}
