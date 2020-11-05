import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { IClientGroupModel } from '../model/client-group.model';
import { ClientGroupsApiService } from './client-groups-api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientGroupListResolver implements Resolve<FleioObjectsList<IClientGroupModel>> {
  constructor(private clientGroupsApi: ClientGroupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IClientGroupModel>> | Promise<FleioObjectsList<IClientGroupModel>> |
    FleioObjectsList<IClientGroupModel> {
    return this.clientGroupsApi.list(route.queryParams as IListQueryParams).pipe(catchError(() => of(null)));
  }
}
