import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserProfileApiService } from './user-profile-api.service';
import { IUserProfileModel } from '../model/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolver implements Resolve<IUserProfileModel> {
  constructor(private userProfileApiService: UserProfileApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IUserProfileModel> | Promise<IUserProfileModel> | IUserProfileModel {
    return this.userProfileApiService.list().pipe(catchError(() => of(null)));
  }
}
