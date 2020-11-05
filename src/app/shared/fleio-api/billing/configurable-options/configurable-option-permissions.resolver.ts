import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';
import { catchError } from 'rxjs/operators';
import { ConfigurableOptionsApiService } from './configurable-option-api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurableOptionPermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private configurableOptionsApiService: ConfigurableOptionsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.configurableOptionsApiService.permissions().pipe(catchError(() => of(null)));
  }
}
