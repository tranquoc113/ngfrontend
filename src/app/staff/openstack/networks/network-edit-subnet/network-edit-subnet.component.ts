import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { ActivatedRoute } from '@angular/router';
import { NetworkListUIService } from '../network-list-ui.service';

@Component({
  selector: 'app-network-edit-subnet',
  templateUrl: './network-edit-subnet.component.html',
  styleUrls: ['./network-edit-subnet.component.scss']
})
export class NetworkEditSubnetComponent extends DetailsBase<INetworkModel> {
  constructor(route: ActivatedRoute, networkListUIService: NetworkListUIService) {
    super(
      route, networkListUIService, 'edit-subnet', 'network',
      ['subnet', 'subnetCreateOptions'],
    );
  }
}
