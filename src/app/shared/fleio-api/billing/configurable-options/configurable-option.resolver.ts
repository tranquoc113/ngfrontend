import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IConfigOptionModel } from '../model/config-option.model';
import { ConfigurableOptionsApiService } from './configurable-option-api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurableOptionResolver implements Resolve<IConfigOptionModel> {
  constructor(private configurableOptionsApiService: ConfigurableOptionsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IConfigOptionModel> | Promise<IConfigOptionModel> | IConfigOptionModel {
    return this.configurableOptionsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
