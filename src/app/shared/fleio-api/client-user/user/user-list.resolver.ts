import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { IUserModel } from '../model/user.model';
import { UsersApiService } from './users-api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserListResolver implements Resolve<FleioObjectsList<IUserModel>> {
  constructor(private usersApi: UsersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IUserModel>> | Promise<FleioObjectsList<IUserModel>> |
    FleioObjectsList<IUserModel> {
    return this.usersApi.list(route.queryParams as IListQueryParams).pipe(catchError(() => of(null)));
  }
}
