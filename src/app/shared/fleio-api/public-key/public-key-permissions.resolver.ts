import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPermissionsModel } from '../base-model/IPermissionsModel';
import { PublicKeysApiService } from './public-key-api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicKeyPermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private publicKeysApiService: PublicKeysApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.publicKeysApiService.permissions().pipe(catchError(() => of(null)));
  }
}
