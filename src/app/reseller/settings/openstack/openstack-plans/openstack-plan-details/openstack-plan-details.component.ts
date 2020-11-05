import { Component } from '@angular/core';
import { DetailsBase } from '../../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { PricingPlanListUIService } from '../openstack-plan-list-ui.service';
import { IPricingPlanModel } from '../../../../../shared/fleio-api/openstack/model/pricing-plan.model';

@Component({
  selector: 'app-openstack-plan-details',
  templateUrl: './openstack-plan-details.component.html',
  styleUrls: ['./openstack-plan-details.component.scss']
})
export class OpenstackPlanDetailsComponent extends DetailsBase<IPricingPlanModel> {
  constructor(route: ActivatedRoute, pricingPlanListUIService: PricingPlanListUIService) {
    super(route, pricingPlanListUIService, 'details', 'pricingPlan');
  }
}
