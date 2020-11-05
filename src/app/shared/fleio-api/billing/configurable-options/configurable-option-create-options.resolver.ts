import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigurableOptionsApiService } from './configurable-option-api.service';
import { IConfigurableOptionCreateOptionsModel } from '@fleio-api/billing/model/configurable-option-create-options.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigurableOptionCreateOptionsResolver implements Resolve<IConfigurableOptionCreateOptionsModel> {
  constructor(private configurableOptionsApiService: ConfigurableOptionsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IConfigurableOptionCreateOptionsModel> | Promise<IConfigurableOptionCreateOptionsModel> |
    IConfigurableOptionCreateOptionsModel {
    return this.configurableOptionsApiService.createOptions().pipe(catchError(() => of(null)));
  }
}
