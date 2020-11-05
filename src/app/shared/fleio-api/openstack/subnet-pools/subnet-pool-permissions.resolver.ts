import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';
import { catchError } from 'rxjs/operators';
import { SubnetPoolsApiService } from '@fleio-api/openstack/subnet-pools/subnet-pools-api.service';

@Injectable({
  providedIn: 'root'
})
export class SubnetPoolPermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private imagesApi: SubnetPoolsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.imagesApi.permissions().pipe(catchError(() => of(null)));
  }
}
