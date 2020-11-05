import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';
import { UserGroupsApiService } from './user-groups-api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserGroupPermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private userGroupsApi: UserGroupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.userGroupsApi.permissions().pipe(catchError(() => of(null)));
  }
}
