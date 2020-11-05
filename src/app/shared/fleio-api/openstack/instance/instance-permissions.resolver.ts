import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { InstancesApiService } from './instances-api.service';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstancePermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private instancesApi: InstancesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.instancesApi.permissions().pipe(catchError(() => of(null)));
  }
}
