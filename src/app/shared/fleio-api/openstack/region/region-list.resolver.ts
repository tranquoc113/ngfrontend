import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '@fleio-api/base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { IRegionModel } from '@fleio-api/openstack/model/region.model';
import { RegionsApiService } from '@fleio-api/openstack/region/regions-api.service';

@Injectable({
  providedIn: 'root'
})
export class RegionListResolver implements Resolve<FleioObjectsList<IRegionModel>> {
  constructor(private regionsApiService: RegionsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IRegionModel>> | Promise<FleioObjectsList<IRegionModel>> |
    FleioObjectsList<IRegionModel> {
    return this.regionsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
