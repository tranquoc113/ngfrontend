import { Component } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IFloatingIpModel } from '@fleio-api/openstack/floating-ips/model/floating-ip.model';
import { FloatingIpListUiService } from '../floating-ip-list-ui.service';

@Component({
  selector: 'app-floating-ip-list',
  templateUrl: './floating-ip-list.component.html',
  styleUrls: ['./floating-ip-list.component.scss']
})
export class FloatingIpListComponent extends ListBase<IFloatingIpModel> {

  constructor(
    private route: ActivatedRoute, private floatingIpListUiService: FloatingIpListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, floatingIpListUiService, refreshService, 'floatingIps');
  }
}
