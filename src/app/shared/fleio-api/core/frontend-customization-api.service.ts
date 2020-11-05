import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { FleioApiService } from '../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaseFleioObjectModel } from '../base-model/base-fleio-object.model';
import { ICustomCodeModel } from './model/custom-code.model';

@Injectable({
  providedIn: 'root'
})
export class FrontendCustomizationApiService extends FleioApiService<IBaseFleioObjectModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('frontend-customization'));
  }

  getCustomCode(): Observable<ICustomCodeModel> {
    return this.getAction('get_custom_code');
  }

  saveCustomCode(customCode: ICustomCodeModel): Observable<any> {
    return this.postAction('save_custom_code', customCode);
  }

  updateFrontend() {
    return this.postAction('update_frontend');
  }
}
