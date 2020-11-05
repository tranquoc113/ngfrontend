import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPricingPlanModel } from '../model/pricing-plan.model';
import { FleioApiService } from '../../fleio-api.service';
import { ConfigService } from '../../../config/config.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PricingPlansApiService extends FleioApiService<IPricingPlanModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/billing/plan'));
  }

  getAlternativePlans(currentPlan: IPricingPlanModel, isStaff: boolean, isReseller: boolean):
    Observable<IPricingPlanModel[]> {
    let filtering: string;
    if (isStaff) {
      let resellerResourcesFilter: string;
      if (currentPlan.reseller_resources === null) {
        resellerResourcesFilter = 'null';
      } else {
        resellerResourcesFilter = currentPlan.reseller_resources.toString()
      }
      filtering = `id__ne:${currentPlan.id}+reseller_resources:${resellerResourcesFilter}`;
    } else if (isReseller) {
      filtering = `id__ne:${currentPlan.id}`;
    }
    return this.list({
      filtering
    }).pipe(map(plans => {
      return plans.objects;
    }));
  }
}
