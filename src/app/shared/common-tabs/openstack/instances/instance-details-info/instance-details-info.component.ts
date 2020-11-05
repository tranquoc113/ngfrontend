import { Component, OnInit } from '@angular/core';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { AuthService } from '@shared/auth/auth.service';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-instance-details-info',
  templateUrl: './instance-details-info.component.html',
  styleUrls: ['./instance-details-info.component.scss']
})
export class InstanceDetailsInfoComponent extends DetailsComponentBase<IInstanceModel> {
  constructor(public auth: AuthService, public config: ConfigService) {
    super();
  }
}
