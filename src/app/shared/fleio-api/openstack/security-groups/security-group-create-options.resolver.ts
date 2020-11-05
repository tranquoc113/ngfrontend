import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISecurityGroupCreateOptionsModel } from '@fleio-api/openstack/model/security-group-create-options.model';
import { SecurityGroupsApiService } from '@fleio-api/openstack/security-groups/security-groups-api.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityGroupCreateOptionsResolver implements Resolve<ISecurityGroupCreateOptionsModel> {
  constructor(private securityGroupsApiService: SecurityGroupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ISecurityGroupCreateOptionsModel> | Promise<ISecurityGroupCreateOptionsModel> |
    ISecurityGroupCreateOptionsModel {
    return this.securityGroupsApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as ISecurityGroupCreateOptionsModel;
  }
}
