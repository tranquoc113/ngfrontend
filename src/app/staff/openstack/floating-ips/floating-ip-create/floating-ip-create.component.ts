import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IFloatingIpModel } from '@fleio-api/openstack/floating-ips/model/floating-ip.model';
import { FloatingIpListUiService } from '../floating-ip-list-ui.service';

@Component({
  selector: 'app-floating-ip-create',
  templateUrl: './floating-ip-create.component.html',
  styleUrls: ['./floating-ip-create.component.scss']
})
export class FloatingIpCreateComponent extends DetailsBase<IFloatingIpModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, floatingIpListUiService: FloatingIpListUiService) {
    super(route, floatingIpListUiService, 'create', null);
  }
}
