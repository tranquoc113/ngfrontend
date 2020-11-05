import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITermsOfServiceModel } from '@fleio-api/core/model/terms-of-service.model';
import { SettingsApiService } from '@fleio-api/core/settings-api.service';

@Injectable({
  providedIn: 'root'
})
export class TosResolver implements Resolve<ITermsOfServiceModel> {
  constructor(private settingsAPI: SettingsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ITermsOfServiceModel> | Promise<ITermsOfServiceModel> | ITermsOfServiceModel {
    return this.settingsAPI.getSingleTermsOfService(
      route.params.id,
      ).pipe(catchError(() => of(null)));
  }
}
