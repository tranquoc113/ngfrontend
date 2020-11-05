import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FlavorGroupsApiService } from './flavor-groups-api.service';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlavorGroupPermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private flavorGroupsApiService: FlavorGroupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.flavorGroupsApiService.permissions().pipe(catchError(() => of(null)));
  }
}
