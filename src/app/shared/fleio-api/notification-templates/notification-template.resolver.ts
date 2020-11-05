import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { INotificationTemplateModel } from './model/notification-template.model';
import { NotificationTemplatesApiService } from './notification-templates-api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationTemplateResolver implements Resolve<INotificationTemplateModel[]> {
  constructor(private notificationTemplatesApiService: NotificationTemplatesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<INotificationTemplateModel[]> | Promise<INotificationTemplateModel[]> | INotificationTemplateModel[] {
    return this.notificationTemplatesApiService.getEditableNotificationTemplate(
      route.params.id
    ).pipe(catchError(() => of(null))).pipe(map(response => {
      return response.objects;
    }));
  }
}
