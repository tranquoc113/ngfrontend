import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RoutersApiService } from '@fleio-api/openstack/routers/routers-api.service';
import { IRouterAddInterfaceCreateOptionsModel } from '@fleio-api/openstack/model/router-add-interface-create-options.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '@shared/ui-api/notification.service';
import { ConfigService } from '@shared/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class RouterAddInterfaceCreateOptionsResolver implements Resolve<IRouterAddInterfaceCreateOptionsModel> {
  constructor(
    private routersApiService: RoutersApiService, private notificationService: NotificationService,
    private router: Router, private config: ConfigService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IRouterAddInterfaceCreateOptionsModel> | Promise<IRouterAddInterfaceCreateOptionsModel> |
    IRouterAddInterfaceCreateOptionsModel {
    return this.routersApiService.addInterfaceCreateOptions(route.params.id)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          if (error.error && error.error.detail) {
            this.notificationService.showMessage(error.error.detail);
            this.router.navigateByUrl(
              this.config.getCurrentUrl()
            ).then(()=>{});
          }
        }
        return of(null);
      })) as unknown as IRouterAddInterfaceCreateOptionsModel;
  }
}
