import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PricingRulesApiService } from './pricing-rules-api.service';
import { IPricingRuleModel } from '../model/pricing-rule.model';

@Injectable({
  providedIn: 'root'
})
export class PricingRuleResolver implements Resolve<IPricingRuleModel> {
  constructor(private pricingRulesApiService: PricingRulesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPricingRuleModel> | Promise<IPricingRuleModel> | IPricingRuleModel {
    return this.pricingRulesApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
