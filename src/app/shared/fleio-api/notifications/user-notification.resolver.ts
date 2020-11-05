import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { INotificationModel } from './model/notification.model';
import { UserNotificationsApiService } from './user-notifications-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationResolver implements Resolve<INotificationModel> {
  constructor(private userNotificationsApiService: UserNotificationsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<INotificationModel> | Promise<INotificationModel> | INotificationModel {
    return this.userNotificationsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
