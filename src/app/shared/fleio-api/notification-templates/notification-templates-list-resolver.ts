import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { INotificationTemplateModel } from './model/notification-template.model';
import { NotificationTemplatesApiService } from './notification-templates-api.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationTemplatesListResolver implements Resolve<FleioObjectsList<INotificationTemplateModel>> {
  constructor(private notificationTemplatesApiService: NotificationTemplatesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<INotificationTemplateModel>> | Promise<FleioObjectsList<INotificationTemplateModel>> |
    FleioObjectsList<INotificationTemplateModel> {
    return this.notificationTemplatesApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
