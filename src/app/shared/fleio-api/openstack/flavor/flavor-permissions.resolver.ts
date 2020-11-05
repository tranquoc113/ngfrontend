import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';
import { catchError } from 'rxjs/operators';
import { FlavorsApiService } from './flavors-api.service';

@Injectable({
  providedIn: 'root'
})
export class FlavorPermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private flavorsApi: FlavorsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.flavorsApi.permissions().pipe(catchError(() => of(null)));
  }
}
