import { Component } from '@angular/core';
import { DetailsBase } from '../../../../../shared/ui/objects-view/details-base';
import { IPricingPlanModel } from '../../../../../shared/fleio-api/openstack/model/pricing-plan.model';
import { ActivatedRoute } from '@angular/router';
import { PricingPlanListUIService } from '../openstack-plan-list-ui.service';

@Component({
  selector: 'app-openstack-plan-edit',
  templateUrl: './openstack-plan-edit.component.html',
  styleUrls: ['./openstack-plan-edit.component.scss']
})
export class OpenstackPlanEditComponent extends DetailsBase<IPricingPlanModel> {
  constructor(route: ActivatedRoute, pricingPlanListUIService: PricingPlanListUIService) {
    super(route, pricingPlanListUIService, 'edit', 'pricingPlan');
  }
}
