import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { FleioApiService } from '../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { ICurrencyModel } from '../billing/model/currency.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesApiService extends FleioApiService<ICurrencyModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('currency'));
  }

  updateExchangeRates(): Observable<any> {
    return this.postAction('update_exchange_rates')
  }

  updateRelativePrices(): Observable<any> {
    return this.postAction('update_relative_prices')
  }
}
