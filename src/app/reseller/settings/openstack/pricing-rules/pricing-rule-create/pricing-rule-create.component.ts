import { Component } from '@angular/core';
import { DetailsBase } from '../../../../../shared/ui/objects-view/details-base';
import { IPricingPlanModel } from '../../../../../shared/fleio-api/openstack/model/pricing-plan.model';
import { ActivatedRoute } from '@angular/router';
import { PricingRuleListUIService } from '../pricing-rule-list-ui.service';

@Component({
  selector: 'app-pricing-rule-create',
  templateUrl: './pricing-rule-create.component.html',
  styleUrls: ['./pricing-rule-create.component.scss']
})
export class PricingRuleCreateComponent extends DetailsBase<IPricingPlanModel> {
  constructor(route: ActivatedRoute, pricingRuleListUIService: PricingRuleListUIService) {
    super(route, pricingRuleListUIService, 'create', null);
  }
}
