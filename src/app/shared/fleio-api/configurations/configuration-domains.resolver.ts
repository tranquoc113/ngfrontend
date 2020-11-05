import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigurationsApiService } from './configurations-api.service';
import { AuthService } from '../../auth/auth.service';
import { IConfigurationDomainsModel } from '@fleio-api/configurations/model/configuration-domains.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationDomainsResolver implements Resolve<IConfigurationDomainsModel> {
  constructor(private configurationApiService: ConfigurationsApiService, private auth: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IConfigurationDomainsModel> | Promise<IConfigurationDomainsModel> | IConfigurationDomainsModel {
    if (this.auth.feature('plugins.domains')) {
      return this.configurationApiService.objectGetAction(
        route.params.id, 'domains',
      ).pipe(
        map(configurationDomains => {
          configurationDomains.id = route.params.id;
          return configurationDomains;
        }),
        catchError(() => of(null))
      );
    } else {
      return null;
    }
  }
}
