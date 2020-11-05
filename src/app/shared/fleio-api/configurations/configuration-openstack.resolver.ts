import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigurationsApiService } from './configurations-api.service';
import { IConfigurationOpenstackModel } from './model/configuration-openstack.model';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationOpenstackResolver implements Resolve<IConfigurationOpenstackModel> {
  constructor(private configurationApiService: ConfigurationsApiService, private auth: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IConfigurationOpenstackModel> | Promise<IConfigurationOpenstackModel> | IConfigurationOpenstackModel {
    if (this.auth.feature('openstack')) {
      return this.configurationApiService.objectGetAction(
        route.params.id, 'openstack',
      ).pipe(
        map(configurationOpenstack => {
          configurationOpenstack.id = route.params.id;
          return configurationOpenstack;
        }),
        catchError(() => of(null))
      );
    } else {
      return null;
    }
  }
}
