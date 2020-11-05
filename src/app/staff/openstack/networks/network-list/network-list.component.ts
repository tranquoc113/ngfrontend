import { Component } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { NetworkListUIService } from '../network-list-ui.service';

@Component({
  selector: 'app-network-list',
  templateUrl: './network-list.component.html',
  styleUrls: ['./network-list.component.scss']
})
export class NetworkListComponent extends ListBase<INetworkModel> {

  constructor(
    private route: ActivatedRoute, private networkListUIService: NetworkListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, networkListUIService, refreshService, 'networks');
  }
}
