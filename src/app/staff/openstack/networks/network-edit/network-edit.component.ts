import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { NetworkListUIService } from '../network-list-ui.service';

@Component({
  selector: 'app-network-edit',
  templateUrl: './network-edit.component.html',
  styleUrls: ['./network-edit.component.scss']
})
export class NetworkEditComponent extends DetailsBase<INetworkModel> {
  constructor(route: ActivatedRoute, networkListUIService: NetworkListUIService) {
    super(route, networkListUIService, 'edit', 'network', ['createOptions']);
  }
}
