import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigurationsApiService } from './configurations-api.service';
import { IConfigurationBillingModel } from './model/configuration-billing.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationBillingResolver implements Resolve<IConfigurationBillingModel> {
  constructor(private configurationApiService: ConfigurationsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IConfigurationBillingModel> | Promise<IConfigurationBillingModel> | IConfigurationBillingModel {
    return this.configurationApiService.objectGetAction(
      route.params.id, 'billing',
    ).pipe(
      map(configurationBilling => {
        configurationBilling.id = route.params.id;
        return configurationBilling;
      }),
      catchError(() => of(null))
    );
  }
}
