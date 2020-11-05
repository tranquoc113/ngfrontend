import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IProductGroupModel } from '@fleio-api/billing/model/product-group.model';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupsApiService extends FleioApiService<IProductGroupModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('billing/productgroups'));
  }
}
