import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IListQueryParams } from '@fleio-api/base-model/list-query-params';
import { IFloatingIpModel } from '@fleio-api/openstack/floating-ips/model/floating-ip.model';
import { FloatingIpsApiService } from '@fleio-api/openstack/floating-ips/floating-ips-api.service';

@Injectable({
  providedIn: 'root'
})
export class FloatingIpListResolver implements Resolve<FleioObjectsList<IFloatingIpModel>> {
  constructor(private floatingIpsApiService: FloatingIpsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IFloatingIpModel>> | Promise<FleioObjectsList<IFloatingIpModel>> |
    FleioObjectsList<IFloatingIpModel> {
    return this.floatingIpsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
