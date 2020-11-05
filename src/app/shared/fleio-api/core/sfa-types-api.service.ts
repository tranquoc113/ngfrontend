import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { FleioApiService } from '../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { ISfaTypeModel } from './model/sfa-type.model';
import { Observable } from 'rxjs';
import { FleioObjectsList } from '../fleio-objects-list';

@Injectable({
  providedIn: 'root'
})
export class SfaTypesApiService extends FleioApiService<ISfaTypeModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('sfauth/sfa-types-manager'));
  }

  getForSettings(): Observable<FleioObjectsList<ISfaTypeModel>> {
    return this.getAction('get_for_settings');
  }

  hasPasswordConfirmed(): Observable<{
    allowed: boolean;
  }> {
    return this.getAction('has_password_confirmed');
  }

  confirmPassword(password: string): Observable<any> {
    return this.postAction('confirm_password', {
      password
    });
  }
}
