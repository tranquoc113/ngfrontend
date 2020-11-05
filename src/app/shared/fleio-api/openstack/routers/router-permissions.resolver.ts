import { RoutersApiService } from '@fleio-api/openstack/routers/routers-api.service';
import { Injectable } from '@angular/core';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterPermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private routersApiService: RoutersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.routersApiService.permissions().pipe(catchError(() => of(null)));
  }
}
