import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { IFlavorGroupModel } from '../model/flavor-group.model';
import { FlavorGroupsApiService } from './flavor-groups-api.service';

@Injectable({
  providedIn: 'root'
})
export class FlavorGroupListResolver implements Resolve<FleioObjectsList<IFlavorGroupModel>> {
  constructor(private flavorGroupsApiService: FlavorGroupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IFlavorGroupModel>> | Promise<FleioObjectsList<IFlavorGroupModel>> |
    FleioObjectsList<IFlavorGroupModel> {
    return this.flavorGroupsApiService.list(route.queryParams as IListQueryParams).pipe(catchError(() => of(null)));
  }
}
