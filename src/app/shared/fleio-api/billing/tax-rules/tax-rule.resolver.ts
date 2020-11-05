import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITaxRuleModel } from '@fleio-api/billing/model/tax-rule.model';
import { TaxRulesApiService } from '@fleio-api/billing/tax-rules/tax-rules-api.service';

@Injectable({
  providedIn: 'root'
})
export class TaxRuleResolver implements Resolve<ITaxRuleModel> {
  constructor(private taxRulesApiService: TaxRulesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ITaxRuleModel> | Promise<ITaxRuleModel> | ITaxRuleModel {
    return this.taxRulesApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
