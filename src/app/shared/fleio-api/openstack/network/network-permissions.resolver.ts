import { Injectable } from '@angular/core';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NetworksApiService } from '@fleio-api/openstack/network/networks-api.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkPermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private networksApiService: NetworksApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.networksApiService.permissions().pipe(catchError(() => of(null)));
  }
}
