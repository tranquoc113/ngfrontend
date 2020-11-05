import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { ISubnetPoolModel } from '@fleio-api/openstack/subnet-pools/model/subnet-pool.model';

@Component({
  selector: 'app-subnet-pool-details-overview',
  templateUrl: './subnet-pool-details-overview.component.html',
  styleUrls: ['./subnet-pool-details-overview.component.scss']
})
export class SubnetPoolDetailsOverviewComponent extends DetailsComponentBase<ISubnetPoolModel> implements OnInit {
}
