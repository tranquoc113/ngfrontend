import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { ITLDModel } from './model/tld.model';
import { FleioId } from '../../base-model/base-fleio-object.model';
import { Observable } from 'rxjs';
import { ITLDPricesModel } from './model/tld-prices.model';

@Injectable({
  providedIn: 'root'
})
export class TLDsApiService extends FleioApiService<ITLDModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/domains/tlds'));
  }

  getPrices(tldId: FleioId): Observable<ITLDPricesModel> {
    return this.objectGetAction(tldId, 'get_prices');
  }

  savePrices(tldId: FleioId, tldPrices: ITLDPricesModel): Observable<ITLDPricesModel> {
    return this.objectPostAction(tldId, 'save_prices', tldPrices);
  }
}
