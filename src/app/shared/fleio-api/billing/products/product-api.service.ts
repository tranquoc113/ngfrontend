import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IProductModel } from '../model/product.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService extends FleioApiService<IProductModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('billing/products'));
  }

  getConfigurableOptions(productId: FleioId): Observable<{
    available_options: Array<{}>;
    configurable_options: Array<{id: any}>;
  }> {
    return this.objectGetAction(productId, 'configurable_options');
  }

  getUpgradeOptions(productId: FleioId): Observable<{
    available_products: Array<IProductModel>;
    selected_products: Array<IProductModel>;
  }> {
    return this.objectGetAction(productId, 'upgrade_options');
  }

  associateOption(productId: FleioId, optionId: FleioId) {
    return this.objectPostAction(productId, 'associate_configurable_option', {
      configurable_option: optionId
    });
  }

  saveUpgrades(productId: FleioId, upgrades: Array<any>) {
    return this.objectPostAction(productId, 'upgrade_options', {upgrades});
  }
}
