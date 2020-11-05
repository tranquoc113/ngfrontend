import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IListQueryParams } from '@fleio-api/base-model/list-query-params';
import { IPortModel } from '@fleio-api/openstack/model/port.model';
import { PortsApiService } from '@fleio-api/openstack/port/ports-api.service';

@Injectable({
  providedIn: 'root'
})
export class PortListResolver implements Resolve<FleioObjectsList<IPortModel>> {
  constructor(private portsApiService: PortsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IPortModel>> | Promise<FleioObjectsList<IPortModel>> |
    FleioObjectsList<IPortModel> {
    return this.portsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
