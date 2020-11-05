import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '@fleio-api/base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { NetworksApiService } from '@fleio-api/openstack/network/networks-api.service';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';

@Injectable({
  providedIn: 'root'
})
export class NetworkListResolver implements Resolve<FleioObjectsList<INetworkModel>> {
  constructor(private networksApiService: NetworksApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<INetworkModel>> | Promise<FleioObjectsList<INetworkModel>> |
    FleioObjectsList<INetworkModel> {
    return this.networksApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
