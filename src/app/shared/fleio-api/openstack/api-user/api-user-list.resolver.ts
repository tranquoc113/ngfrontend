import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { ApiUsersApiService } from './api-users-api.service';
import { IApiUserModel } from '../model/api-user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiUserListResolver implements Resolve<FleioObjectsList<IApiUserModel>> {
  constructor(private apiUsersApiService: ApiUsersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IApiUserModel>> | Promise<FleioObjectsList<IApiUserModel>> |
    FleioObjectsList<IApiUserModel> {
    return this.apiUsersApiService.list(route.queryParams as IListQueryParams).pipe(
      catchError(() => of(null))
    );
  }
}
