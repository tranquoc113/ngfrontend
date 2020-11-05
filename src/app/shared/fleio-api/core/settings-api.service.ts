import { Injectable } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { FleioApiService } from '../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FleioId, IBaseFleioObjectModel } from '../base-model/base-fleio-object.model';
import { ISignupInfoModel } from './model/signup-info.model';
import { ISignupSettingsModel } from './model/signup-settings.model';
import { IAuthSettingsModel } from './model/auth-settings.model';
import { ISfaSettingsModel } from './model/sfa-settings.model';
import { map } from 'rxjs/operators';
import { ITOSSettingsModel } from './model/tos-settings.model';
import { ITermsOfServiceModel } from './model/terms-of-service.model';
import { FleioObjectsList } from '../fleio-objects-list';

@Injectable({
  providedIn: 'root'
})
export class SettingsApiService extends FleioApiService<IBaseFleioObjectModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('settings'));
  }

  getSignupSettings(): Observable<ISignupInfoModel> {
    return this.getAction('sign-up-settings');
  }

  saveSignupSettings(signupSettings: ISignupSettingsModel): Observable<any> {
    return this.postAction('sign-up-settings', signupSettings);
  }

  getAuthSettings(): Observable<IAuthSettingsModel> {
    return this.getAction('auth-settings').pipe(map(result => result.auth_settings));
  }

  saveAuthSettings(authSettings: IAuthSettingsModel): Observable<any> {
    return this.postAction('auth-settings', authSettings);
  }

  getSfaSettings(): Observable<ISfaSettingsModel> {
    return this.getAction('sfa-settings').pipe(map(result => result.sfa_settings));
  }

  saveSfaSettings(sfaSettings: ISfaSettingsModel): Observable<any> {
    return this.postAction('sfa-settings', sfaSettings);
  }

  getTOSSettings(): Observable<ITOSSettingsModel> {
    return this.getAction('tos-settings').pipe(map(result => {
      return result.tos_settings;
    }));
  }

  saveTOSSettings(tosSettings: ITOSSettingsModel): Observable<any> {
    return this.postAction('tos-settings', tosSettings);
  }

  createTermsOfService(termsOfService: ITermsOfServiceModel): Observable<any> {
    return this.postAction('tos', termsOfService);
  }

  deleteTermsOfService(id: FleioId): Observable<any> {
    return this.delete(`tos/${id}`);
  }

  saveTermsOfService(termsOfService: ITermsOfServiceModel): Observable<any> {
    return this.putAction(`tos/${termsOfService.id}`, termsOfService);
  }

  getTermsOfService(): Observable<FleioObjectsList<ITermsOfServiceModel>> {
    return this.getAction('tos').pipe(map(objectList => {
      return objectList as FleioObjectsList<ITermsOfServiceModel>;
    }));
  }
  getSingleTermsOfService(id: FleioId): Observable<ITermsOfServiceModel> {
    return this.getAction(`tos/${id}`);
  }
}
