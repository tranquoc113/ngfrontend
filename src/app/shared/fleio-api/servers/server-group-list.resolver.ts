import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FleioObjectsList } from '../fleio-objects-list';
import { IListQueryParams } from '../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { IServerGroupModel } from './model/server-group.model';
import { ServerGroupsApiService } from './server-groups-api.service';

@Injectable({
  providedIn: 'root'
})
export class ServerGroupListResolver implements Resolve<FleioObjectsList<IServerGroupModel>> {
  constructor(private serverGroupsApiService: ServerGroupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IServerGroupModel>> | Promise<FleioObjectsList<IServerGroupModel>> |
    FleioObjectsList<IServerGroupModel> {
    return this.serverGroupsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
