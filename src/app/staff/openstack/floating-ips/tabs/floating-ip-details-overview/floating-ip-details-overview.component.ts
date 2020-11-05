import { Component } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { ConfigService } from '@shared/config/config.service';
import { IFloatingIpModel } from '@fleio-api/openstack/floating-ips/model/floating-ip.model';

@Component({
  selector: 'app-floating-ip-details-overview',
  templateUrl: './floating-ip-details-overview.component.html',
  styleUrls: ['./floating-ip-details-overview.component.scss']
})
export class FloatingIpDetailsOverviewComponent extends DetailsComponentBase<IFloatingIpModel> {
  extraDisplay: any;
  securityGroups: any;

  constructor(public config: ConfigService) {
    super();
  }
}
