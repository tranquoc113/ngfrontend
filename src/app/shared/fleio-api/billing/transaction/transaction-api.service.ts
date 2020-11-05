import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { ITransactionModel } from '../model/transaction.model';


@Injectable({
  providedIn: 'root'
})
export class TransactionsApiService extends FleioApiService<ITransactionModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('billing/transactions'));
  }
}
