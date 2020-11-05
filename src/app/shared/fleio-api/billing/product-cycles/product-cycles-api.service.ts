import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCyclesApiService extends FleioApiService<IBaseFleioObjectModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('billing/productcycles'));
  }
}
