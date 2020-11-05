import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPricingPlanCreateOptions } from '../model/pricing-plan-create-options';
import { PricingPlansApiService } from './pricing-plans-api.service';

@Injectable({
  providedIn: 'root'
})
export class PricingPlanCreateOptionsResolver implements Resolve<IPricingPlanCreateOptions> {
  constructor(private pricingPlansApiService: PricingPlansApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPricingPlanCreateOptions> | Promise<IPricingPlanCreateOptions> | IPricingPlanCreateOptions {
    return this.pricingPlansApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IPricingPlanCreateOptions;
  }
}
