import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { ITaxRuleModel } from '@fleio-api/billing/model/tax-rule.model';
import { TaxRulesApiService } from '@fleio-api/billing/tax-rules/tax-rules-api.service';

@Injectable({
  providedIn: 'root'
})
export class TaxRulesListResolver implements Resolve<FleioObjectsList<ITaxRuleModel>> {
  constructor(private taxRulesApiService: TaxRulesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<ITaxRuleModel>> | Promise<FleioObjectsList<ITaxRuleModel>> |
    FleioObjectsList<ITaxRuleModel> {
    return this.taxRulesApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
