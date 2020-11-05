import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPricingPlanModel } from '../model/pricing-plan.model';
import { PricingPlansApiService } from './pricing-plans-api.service';
import { IListQueryParams } from '../../base-model/list-query-params';
import { FleioObjectsList } from '../../fleio-objects-list';

@Injectable({
  providedIn: 'root'
})
export class PricingPlanListResolver implements Resolve<FleioObjectsList<IPricingPlanModel>> {
  constructor(private pricingPlansApiService: PricingPlansApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IPricingPlanModel>> | Promise<FleioObjectsList<IPricingPlanModel>> |
    FleioObjectsList<IPricingPlanModel> {
    return this.pricingPlansApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
