import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { Observable } from 'rxjs';
import { ISfaTypeModel } from '@fleio-api/core/model/sfa-type.model';
import { ConfigService } from '@shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class SmsAuthenticatorAnonymousApiService extends FleioApiService<ISfaTypeModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/sms_authenticator/anonymous'));
  }

  sendCode(data: {
    username: string;
    password: string;
  }): Observable<{
    detail: string;
    receiver: string;
  }> {
    return this.postAction('send_verification_code', data);
  }
}
