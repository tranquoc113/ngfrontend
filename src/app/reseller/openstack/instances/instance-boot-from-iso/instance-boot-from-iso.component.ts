import { Component } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IInstanceModel } from '../../../../shared/fleio-api/openstack/model/instance.model';
import { ActivatedRoute } from '@angular/router';
import { InstanceListUIService } from '../instance-list-ui.service';

@Component({
  selector: 'app-instance-boot-from-iso',
  templateUrl: './instance-boot-from-iso.component.html',
  styleUrls: ['./instance-boot-from-iso.component.scss']
})
export class InstanceBootFromIsoComponent extends DetailsBase<IInstanceModel> {
  constructor(route: ActivatedRoute, instanceListUIService: InstanceListUIService) {
    super(route, instanceListUIService, 'bootFromIso', 'instance');
  }
}
