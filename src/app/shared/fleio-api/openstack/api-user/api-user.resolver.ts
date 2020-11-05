import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IApiUserModel } from '../model/api-user.model';
import { ApiUsersApiService } from './api-users-api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiUserResolver implements Resolve<IApiUserModel> {
  constructor(private apiUsersApiService: ApiUsersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IApiUserModel> | Promise<IApiUserModel> | IApiUserModel {
    return this.apiUsersApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
