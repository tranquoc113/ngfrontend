import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IApiUserCreateOptionsModel } from '../model/api-user-create-options.model';
import { ApiUsersApiService } from './api-users-api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiUserCreateOptionsResolver implements Resolve<IApiUserCreateOptionsModel> {
  constructor(private apiUsersApiService: ApiUsersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IApiUserCreateOptionsModel> | Promise<IApiUserCreateOptionsModel> | IApiUserCreateOptionsModel {
    return this.apiUsersApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IApiUserCreateOptionsModel;
  }
}
