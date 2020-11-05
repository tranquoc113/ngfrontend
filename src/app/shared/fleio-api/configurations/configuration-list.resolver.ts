import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { IConfigurationModel } from './model/configuration.model';
import { ConfigurationsApiService } from './configurations-api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationListResolver implements Resolve<FleioObjectsList<IConfigurationModel>> {
  constructor(private configurationApiService: ConfigurationsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IConfigurationModel>> | Promise<FleioObjectsList<IConfigurationModel>> |
    FleioObjectsList<IConfigurationModel> {
    return this.configurationApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
