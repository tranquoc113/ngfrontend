import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { IUserGroupModel } from '../model/user-group.model';
import { UserGroupsApiService } from './user-groups-api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserGroupListResolver implements Resolve<FleioObjectsList<IUserGroupModel>> {
  constructor(private userGroupsApi: UserGroupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IUserGroupModel>> | Promise<FleioObjectsList<IUserGroupModel>> |
    FleioObjectsList<IUserGroupModel> {
    return this.userGroupsApi.list(route.queryParams as IListQueryParams).pipe(catchError(() => of(null)));
  }
}
