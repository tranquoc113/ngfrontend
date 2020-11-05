import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PricingPlansApiService } from './pricing-plans-api.service';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';

@Injectable({
  providedIn: 'root'
})
export class PricingPlanPermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private pricingPlansApiService: PricingPlansApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.pricingPlansApiService.permissions().pipe(catchError(() => of(null)));
  }
}
