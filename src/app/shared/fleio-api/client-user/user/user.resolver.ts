import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IUserModel } from '../model/user.model';
import { UsersApiService } from './users-api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<IUserModel> {
  constructor(private usersApi: UsersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IUserModel> | Promise<IUserModel> | IUserModel {
    return this.usersApi.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
