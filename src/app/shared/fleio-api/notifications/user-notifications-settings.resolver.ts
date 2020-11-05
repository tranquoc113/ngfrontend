import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserNotificationsApiService } from './user-notifications-api.service';
import { IUserNotificationSettingsResponseModel } from './model/user-notification-settings-response.model';


@Injectable({
  providedIn: 'root'
})
export class UserNotificationsSettingsResolver implements Resolve<IUserNotificationSettingsResponseModel> {
  constructor(private userNotificationsApiService: UserNotificationsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IUserNotificationSettingsResponseModel> | Promise<IUserNotificationSettingsResponseModel>
    | IUserNotificationSettingsResponseModel {
    return this.userNotificationsApiService.getAction(
      'get_user_notifications_settings', {}
      ).pipe(catchError(() => of(null)));
  }
}
