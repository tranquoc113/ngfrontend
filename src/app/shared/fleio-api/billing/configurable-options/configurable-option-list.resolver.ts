import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { IConfigOptionModel } from '../model/config-option.model';
import { ConfigurableOptionsApiService } from './configurable-option-api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurableOptionListResolver implements Resolve<FleioObjectsList<IConfigOptionModel>> {
  constructor(private configurableOptionsApiService: ConfigurableOptionsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IConfigOptionModel>> | Promise<FleioObjectsList<IConfigOptionModel>> |
    FleioObjectsList<IConfigOptionModel> {
    return this.configurableOptionsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
