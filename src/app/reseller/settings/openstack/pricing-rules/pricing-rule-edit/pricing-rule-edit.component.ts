import { Component } from '@angular/core';
import { DetailsBase } from '../../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { PricingRuleListUIService } from '../pricing-rule-list-ui.service';
import { IPricingRuleModel } from '../../../../../shared/fleio-api/openstack/model/pricing-rule.model';

@Component({
  selector: 'app-pricing-rule-edit',
  templateUrl: './pricing-rule-edit.component.html',
  styleUrls: ['./pricing-rule-edit.component.scss']
})
export class PricingRuleEditComponent extends DetailsBase<IPricingRuleModel> {
  constructor(route: ActivatedRoute, pricingRuleListUIService: PricingRuleListUIService) {
    super(route, pricingRuleListUIService, 'edit', 'pricingRule');
  }
}
