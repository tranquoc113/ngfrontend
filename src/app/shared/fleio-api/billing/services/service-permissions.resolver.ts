import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';
import { catchError } from 'rxjs/operators';
import { ServicesApiService } from './service-api.service';

@Injectable({
  providedIn: 'root'
})
export class ServicePermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private servicesApiService: ServicesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.servicesApiService.permissions().pipe(catchError(() => of(null)));
  }
}
