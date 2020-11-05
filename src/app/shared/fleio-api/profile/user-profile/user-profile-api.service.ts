import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IUserModel } from '../../client-user/model/user.model';
import { Observable } from 'rxjs';
import { IUserProfileModel } from '@fleio-api/profile/model/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileApiService extends FleioApiService<IUserModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('userprofile'));
  }

  getProfile(): Observable<IUserProfileModel> {
    // @ts-ignore
    return this.list();
  }
}
