import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IFloatingIpModel } from '@fleio-api/openstack/floating-ips/model/floating-ip.model';
import { FloatingIpListUiService } from '../floating-ip-list-ui.service';

@Component({
  selector: 'app-floating-ip-details',
  templateUrl: './floating-ip-details.component.html',
  styleUrls: ['./floating-ip-details.component.scss']
})
export class FloatingIpDetailsComponent extends DetailsBase<IFloatingIpModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, floatingIpListUiService: FloatingIpListUiService) {
    super(route, floatingIpListUiService, 'details', 'floatingIp');
  }
}
