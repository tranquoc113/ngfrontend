import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { ConfigService } from '@shared/config/config.service';
import { ISfaTypeModel } from '@fleio-api/core/model/sfa-type.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthenticatorApiService extends FleioApiService<ISfaTypeModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/google_authenticator/api'));
  }

  disable() {
    return this.postAction('disable_sfa_method');
  }

  regenerate() {
    return this.postAction('regenerate_key');
  }

  makeDefault() {
    return this.postAction('set_as_default');
  }

  enable(verificationCode) {
    return this.postAction('enable_sfa_method', {
      verification_code: verificationCode
    });
  }

  getStatus(): Observable<{
    enabled: boolean;
    default: boolean;
  }> {
    return this.getAction('get_sfa_method_status');
  }

  getCode(): Observable<{
    secret_key: string;
  }> {
    return this.getAction('get_code');
  }

}
