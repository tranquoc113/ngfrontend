import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { IRegistrarConnectorModel } from './model/registrar-connector.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarConnectorApiService extends FleioApiService<IRegistrarConnectorModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/domains/registrar_connectors'));
  }

  getRegistrarPrices(tldName: string): Observable<IRegistrarConnectorModel[]> {
    return this.getAction('registrar_prices', {tld_name: tldName});
  }

  updateRegistrarPrices(connector: string, tldName: string) : Observable<any> {
    return this.postAction('update_registrar_prices', {
      action: 'update_registrar_prices',
      connector,
      tld_name: tldName,
    })
  }
}
