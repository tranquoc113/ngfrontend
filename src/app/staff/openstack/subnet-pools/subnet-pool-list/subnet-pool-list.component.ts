import { Component } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { ISubnetPoolModel } from '@fleio-api/openstack/subnet-pools/model/subnet-pool.model';
import { SubnetPoolListUiService } from '../subnet-pool-list-ui.service';

@Component({
  selector: 'app-subnet-pool-list',
  templateUrl: './subnet-pool-list.component.html',
  styleUrls: ['./subnet-pool-list.component.scss']
})
export class SubnetPoolListComponent extends ListBase<ISubnetPoolModel> {

  constructor(
    private route: ActivatedRoute, private subnetPoolListUiService: SubnetPoolListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, subnetPoolListUiService, refreshService, 'subnetPools');
  }
}
