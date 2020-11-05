import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { NetworkListUIService } from '../network-list-ui.service';

@Component({
  selector: 'app-network-create',
  templateUrl: './network-create.component.html',
  styleUrls: ['./network-create.component.scss']
})
export class NetworkCreateComponent extends DetailsBase<INetworkModel> {
  constructor(route: ActivatedRoute, networkListUIService: NetworkListUIService) {
    super(route, networkListUIService, 'create', null, ['createOptions']);
  }
}
