import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { ISubnetPoolModel } from '@fleio-api/openstack/subnet-pools/model/subnet-pool.model';
import { SubnetPoolListUiService } from '../subnet-pool-list-ui.service';

@Component({
  selector: 'app-subnet-pool-create',
  templateUrl: './subnet-pool-create.component.html',
  styleUrls: ['./subnet-pool-create.component.scss']
})
export class SubnetPoolCreateComponent extends DetailsBase<ISubnetPoolModel> {
  constructor(route: ActivatedRoute, subnetPoolListUiService: SubnetPoolListUiService) {
    super(route, subnetPoolListUiService, 'create', null, ['createOptions']);
  }
}
