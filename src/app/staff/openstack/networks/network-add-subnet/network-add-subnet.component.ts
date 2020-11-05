import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { NetworkListUIService } from '../network-list-ui.service';

@Component({
  selector: 'app-network-add-subnet',
  templateUrl: './network-add-subnet.component.html',
  styleUrls: ['./network-add-subnet.component.scss']
})
export class NetworkAddSubnetComponent extends DetailsBase<INetworkModel> {
  constructor(route: ActivatedRoute, networkListUIService: NetworkListUIService) {
    super(
      route, networkListUIService, 'add-subnet', 'network', ['subnetCreateOptions'],
    );
  }
}
