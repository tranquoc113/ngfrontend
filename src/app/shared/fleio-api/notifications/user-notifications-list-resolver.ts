import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../fleio-objects-list';
import { INotificationModel } from './model/notification.model';
import { UserNotificationsApiService } from './user-notifications-api.service';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../base-model/list-query-params';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserNotificationsListResolver implements Resolve<FleioObjectsList<INotificationModel>> {
  constructor(private userNotificationsApiService: UserNotificationsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<INotificationModel>> | Promise<FleioObjectsList<INotificationModel>> |
    FleioObjectsList<INotificationModel> {
    return this.userNotificationsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
