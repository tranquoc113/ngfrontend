import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISecurityGroupModel } from '@fleio-api/openstack/model/security-group.model';
import { SecurityGroupsApiService } from '@fleio-api/openstack/security-groups/security-groups-api.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityGroupResolver implements Resolve<ISecurityGroupModel> {
  constructor(private securityGroupsApiService: SecurityGroupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ISecurityGroupModel> | Promise<ISecurityGroupModel> | ISecurityGroupModel {
    return this.securityGroupsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
