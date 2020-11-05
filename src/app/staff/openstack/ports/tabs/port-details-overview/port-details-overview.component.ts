import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IPortModel } from '@fleio-api/openstack/model/port.model';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-port-details-overview',
  templateUrl: './port-details-overview.component.html',
  styleUrls: ['./port-details-overview.component.scss']
})
export class PortDetailsOverviewComponent extends DetailsComponentBase<IPortModel> implements OnInit {
  extraDisplay: any;
  securityGroups: any;

  constructor(public config: ConfigService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.object) {
      this.extraDisplay = JSON.parse(
        this.object.extra.replace(
          /'/g, '"'
        ).replace(
          /None/g, 'null'
        )
      );
      this.securityGroups = JSON.parse(
        this.object.security_groups.replace(
          /'/g, '"'
        ).replace(
          /None/g, 'null'
        )
      );
    }
  }
}
