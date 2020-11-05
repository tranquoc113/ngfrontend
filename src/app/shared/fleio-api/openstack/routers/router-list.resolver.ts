import { Injectable } from '@angular/core';
import { IRouterModel } from '@fleio-api/openstack/model/router.model';
import { RoutersApiService } from '@fleio-api/openstack/routers/routers-api.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '@fleio-api/base-model/list-query-params';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterListResolver implements Resolve<FleioObjectsList<IRouterModel>> {
  constructor(private routersApiService: RoutersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IRouterModel>> | Promise<FleioObjectsList<IRouterModel>> |
    FleioObjectsList<IRouterModel> {
    return this.routersApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
