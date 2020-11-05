import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { ActivatedRoute } from '@angular/router';
import { NetworkListUIService } from '../network-list-ui.service';

@Component({
  selector: 'app-network-config-auto-create',
  templateUrl: './network-config-auto-create.component.html',
  styleUrls: ['./network-config-auto-create.component.scss']
})
export class NetworkConfigAutoCreateComponent extends DetailsBase<INetworkModel> {
  constructor(route: ActivatedRoute, networkListUIService: NetworkListUIService) {
    super(route, networkListUIService, 'config-auto-create', null, ['regions']);
  }
}
