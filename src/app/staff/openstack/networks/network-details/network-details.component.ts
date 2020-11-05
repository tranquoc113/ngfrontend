import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { NetworkListUIService } from '../network-list-ui.service';

@Component({
  selector: 'app-network-details',
  templateUrl: './network-details.component.html',
  styleUrls: ['./network-details.component.scss']
})
export class NetworkDetailsComponent extends DetailsBase<INetworkModel> {
  constructor(route: ActivatedRoute, networkListUIService: NetworkListUIService) {
    super(route, networkListUIService, 'details', 'network');
  }
}
