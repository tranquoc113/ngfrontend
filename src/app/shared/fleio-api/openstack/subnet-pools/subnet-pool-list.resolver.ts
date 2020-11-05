import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IListQueryParams } from '@fleio-api/base-model/list-query-params';
import { SubnetPoolsApiService } from '@fleio-api/openstack/subnet-pools/subnet-pools-api.service';
import { ISubnetPoolModel } from '@fleio-api/openstack/subnet-pools/model/subnet-pool.model';

@Injectable({
  providedIn: 'root'
})
export class SubnetPoolListResolver implements Resolve<FleioObjectsList<ISubnetPoolModel>> {
  constructor(private subnetPoolsApiService: SubnetPoolsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<ISubnetPoolModel>> | Promise<FleioObjectsList<ISubnetPoolModel>> |
    FleioObjectsList<ISubnetPoolModel> {
    return this.subnetPoolsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
