import { Component } from '@angular/core';
import { DetailsBase } from '../../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IPricingPlanModel } from '../../../../../shared/fleio-api/openstack/model/pricing-plan.model';
import { PricingPlanListUIService } from '../openstack-plan-list-ui.service';

@Component({
  selector: 'app-openstack-plan-create',
  templateUrl: './openstack-plan-create.component.html',
  styleUrls: ['./openstack-plan-create.component.scss']
})
export class OpenstackPlanCreateComponent extends DetailsBase<IPricingPlanModel> {
  constructor(route: ActivatedRoute, pricingPlanListUIService: PricingPlanListUIService) {
    super(route, pricingPlanListUIService, 'create', null);
  }
}
