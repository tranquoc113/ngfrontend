import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { ISubnetPoolModel } from '@fleio-api/openstack/subnet-pools/model/subnet-pool.model';
import { SubnetPoolListUiService } from '../subnet-pool-list-ui.service';

@Component({
  selector: 'app-subnet-pool-details',
  templateUrl: './subnet-pool-details.component.html',
  styleUrls: ['./subnet-pool-details.component.scss']
})
export class SubnetPoolDetailsComponent extends DetailsBase<ISubnetPoolModel> {
  constructor(route: ActivatedRoute, subnetPoolListUiService: SubnetPoolListUiService) {
    super(route, subnetPoolListUiService, 'details', 'subnetPool');
  }
}
