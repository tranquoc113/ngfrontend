import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IListQueryParams } from '@fleio-api/base-model/list-query-params';
import { IZoneModel } from '@fleio-api/openstack/zone/model/zone.model';
import { ZonesApiService } from '@fleio-api/openstack/zone/zones-api.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneListResolver implements Resolve<FleioObjectsList<IZoneModel>> {
  constructor(private zonesApiService: ZonesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IZoneModel>> | Promise<FleioObjectsList<IZoneModel>> |
    FleioObjectsList<IZoneModel> {
    return this.zonesApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
