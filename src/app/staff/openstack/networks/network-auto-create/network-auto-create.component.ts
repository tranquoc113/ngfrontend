import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { ActivatedRoute } from '@angular/router';
import { NetworkListUIService } from '../network-list-ui.service';

@Component({
  selector: 'app-network-auto-create',
  templateUrl: './network-auto-create.component.html',
  styleUrls: ['./network-auto-create.component.scss']
})
export class NetworkAutoCreateComponent extends DetailsBase<INetworkModel> {
  constructor(route: ActivatedRoute, networkListUIService: NetworkListUIService) {
    super(route, networkListUIService, 'auto-create', null, ['createOptions']);
  }
}
