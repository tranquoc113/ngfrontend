import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NetworksApiService } from '@fleio-api/openstack/network/networks-api.service';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';

@Injectable({
  providedIn: 'root'
})
export class NetworkResolver implements Resolve<INetworkModel> {
  constructor(private networksApiService: NetworksApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<INetworkModel> | Promise<INetworkModel> | INetworkModel {
    return this.networksApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
