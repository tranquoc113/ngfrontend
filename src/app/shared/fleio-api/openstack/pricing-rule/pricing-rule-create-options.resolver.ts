import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PricingRulesApiService } from './pricing-rules-api.service';
import { IPricingRuleCreateOptions } from '../model/pricing-rule-create-options';

@Injectable({
  providedIn: 'root'
})
export class PricingRuleCreateOptionsResolver implements Resolve<IPricingRuleCreateOptions> {
  constructor(private pricingRulesApiService: PricingRulesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPricingRuleCreateOptions> | Promise<IPricingRuleCreateOptions> | IPricingRuleCreateOptions {
    return this.pricingRulesApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IPricingRuleCreateOptions;
  }
}
