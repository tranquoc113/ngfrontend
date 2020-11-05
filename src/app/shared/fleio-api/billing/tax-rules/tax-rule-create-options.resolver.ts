import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITaxRuleCreateOptionsModel } from '@fleio-api/billing/model/tax-rule-create-options.model';
import { TaxRulesApiService } from '@fleio-api/billing/tax-rules/tax-rules-api.service';

@Injectable({
  providedIn: 'root'
})
export class TaxRuleCreateOptionsResolver implements Resolve<ITaxRuleCreateOptionsModel> {
  constructor(private taxRulesApiService: TaxRulesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ITaxRuleCreateOptionsModel> | Promise<ITaxRuleCreateOptionsModel> | ITaxRuleCreateOptionsModel {
    return this.taxRulesApiService.createOptions().pipe(catchError(() => of(null)));
  }
}
