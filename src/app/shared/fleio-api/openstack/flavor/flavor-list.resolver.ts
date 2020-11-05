import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { IFlavorModel } from '../model/flavor.model';
import { FlavorsApiService } from './flavors-api.service';

@Injectable({
  providedIn: 'root'
})
export class FlavorListResolver implements Resolve<FleioObjectsList<IFlavorModel>> {
  constructor(private flavorsApiService: FlavorsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IFlavorModel>> | Promise<FleioObjectsList<IFlavorModel>> |
    FleioObjectsList<IFlavorModel> {
    return this.flavorsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
