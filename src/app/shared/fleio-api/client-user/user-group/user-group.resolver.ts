import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IUserGroupModel } from '../model/user-group.model';
import { UserGroupsApiService } from './user-groups-api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserGroupResolver implements Resolve<IUserGroupModel> {
  constructor(private userGroupsApi: UserGroupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IUserGroupModel> | Promise<IUserGroupModel> | IUserGroupModel {
    return this.userGroupsApi.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
