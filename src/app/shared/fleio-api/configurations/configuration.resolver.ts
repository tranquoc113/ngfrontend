import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IConfigurationModel } from './model/configuration.model';
import { ConfigurationsApiService } from './configurations-api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationResolver implements Resolve<IConfigurationModel> {
  constructor(private configurationApiService: ConfigurationsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IConfigurationModel> | Promise<IConfigurationModel> | IConfigurationModel {
    return this.configurationApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
