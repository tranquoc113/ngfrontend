import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPricingPlanModel } from '../model/pricing-plan.model';
import { PricingPlansApiService } from './pricing-plans-api.service';

@Injectable({
  providedIn: 'root'
})
export class PricingPlanResolver implements Resolve<IPricingPlanModel> {
  constructor(private pricingPlansApiService: PricingPlansApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPricingPlanModel> | Promise<IPricingPlanModel> | IPricingPlanModel {
    return this.pricingPlansApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
