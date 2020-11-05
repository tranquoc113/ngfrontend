import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { Observable } from 'rxjs';
import { ISfaTypeModel } from '@fleio-api/core/model/sfa-type.model';
import { ConfigService } from '@shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class SmsAuthenticatorApiService extends FleioApiService<ISfaTypeModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/sms_authenticator/api'));
  }

  disable() {
    return this.postAction('disable_sfa_method');
  }

  sendCode() {
    return this.postAction('send_verification_code');
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
}
