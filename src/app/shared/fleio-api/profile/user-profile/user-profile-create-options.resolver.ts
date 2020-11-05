import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserProfileApiService } from './user-profile-api.service';
import { IUserProfileCreateOptionsModel } from '../model/user-profile-create-options.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileCreateOptionsResolver implements Resolve<IUserProfileCreateOptionsModel> {
  constructor(private userProfileApiService: UserProfileApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IUserProfileCreateOptionsModel> | Promise<IUserProfileCreateOptionsModel> |
    IUserProfileCreateOptionsModel {
    return this.userProfileApiService.createOptions().pipe(catchError(() => of(null)));
  }
}
