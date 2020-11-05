import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';
import { catchError } from 'rxjs/operators';
import { SecurityGroupsApiService } from '@fleio-api/openstack/security-groups/security-groups-api.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityGroupPermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private securityGroupsApiService: SecurityGroupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.securityGroupsApiService.permissions().pipe(catchError(() => of(null)));
  }
}
