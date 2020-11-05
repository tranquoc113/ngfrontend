import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { ISecurityGroupModel } from '@fleio-api/openstack/model/security-group.model';
import { SecurityGroupsApiService } from '@fleio-api/openstack/security-groups/security-groups-api.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityGroupListResolver implements Resolve<FleioObjectsList<ISecurityGroupModel>> {
  constructor(private securityGroupsApiService: SecurityGroupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<ISecurityGroupModel>> | Promise<FleioObjectsList<ISecurityGroupModel>> |
    FleioObjectsList<ISecurityGroupModel> {
    return this.securityGroupsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
