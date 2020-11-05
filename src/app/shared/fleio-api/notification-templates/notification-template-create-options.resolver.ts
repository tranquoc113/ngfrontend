import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { INotificationTemplateCreateOptionsModel } from './model/notification-template-create-options';
import { NotificationTemplatesApiService } from './notification-templates-api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationTemplateCreateOptionsResolver implements Resolve<INotificationTemplateCreateOptionsModel> {
  constructor(private notificationTemplatesApiService: NotificationTemplatesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<INotificationTemplateCreateOptionsModel> | Promise<INotificationTemplateCreateOptionsModel> |
    INotificationTemplateCreateOptionsModel {
    return this.notificationTemplatesApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as INotificationTemplateCreateOptionsModel;
  }
}
