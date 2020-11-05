import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRouterCreateOptionsModel } from '@fleio-api/openstack/model/router-create-options.model';
import { RoutersApiService } from '@fleio-api/openstack/routers/routers-api.service';

@Injectable({
  providedIn: 'root'
})
export class RouterCreateOptionsResolver implements Resolve<IRouterCreateOptionsModel> {
  constructor(private routersApiService: RoutersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IRouterCreateOptionsModel> | Promise<IRouterCreateOptionsModel> | IRouterCreateOptionsModel {
    return this.routersApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IRouterCreateOptionsModel;
  }
}
