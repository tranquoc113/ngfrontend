import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServicesApiService } from './service-api.service';
import { IServiceUpgradeOptionsModel } from '../model/service-upgrade-options.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceUpgradeOptionsResolver implements Resolve<IServiceUpgradeOptionsModel> {
  constructor(private servicesApiService: ServicesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IServiceUpgradeOptionsModel> | Promise<IServiceUpgradeOptionsModel> | IServiceUpgradeOptionsModel {
    return this.servicesApiService.upgradeOptions(route.params.id).pipe(catchError(() => of(null)));
  }
}
