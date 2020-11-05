import { Component, OnInit } from '@angular/core';
import { ListBase } from '../../../../../shared/ui/objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../../shared/ui-api/refresh.service';
import { IPricingPlanModel } from '../../../../../shared/fleio-api/openstack/model/pricing-plan.model';
import { PricingPlanListUIService } from '../openstack-plan-list-ui.service';

@Component({
  selector: 'app-openstack-plan-list',
  templateUrl: './openstack-plan-list.component.html',
  styleUrls: ['./openstack-plan-list.component.scss']
})
export class OpenstackPlanListComponent extends ListBase<IPricingPlanModel> implements OnInit {
  constructor(
    private route: ActivatedRoute, private pricingPlanListUIService: PricingPlanListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, pricingPlanListUIService, refreshService, 'pricingPlans');
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
