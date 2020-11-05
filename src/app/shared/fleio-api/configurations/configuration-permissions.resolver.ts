import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPermissionsModel } from '../base-model/IPermissionsModel';
import { catchError } from 'rxjs/operators';
import { ConfigurationsApiService } from './configurations-api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationPermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private configurationApiService: ConfigurationsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.configurationApiService.permissions().pipe(catchError(() => of(null)));
  }
}
