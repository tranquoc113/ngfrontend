import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstanceListUIService } from '../instance-list-ui.service';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IInstanceModel } from '../../../../shared/fleio-api/openstack/model/instance.model';

@Component({
  selector: 'app-instance-rescue',
  templateUrl: './instance-rescue.component.html',
  styleUrls: ['./instance-rescue.component.scss']
})
export class InstanceRescueComponent extends DetailsBase<IInstanceModel> {
  constructor(route: ActivatedRoute, instanceListUIService: InstanceListUIService) {
    super(route, instanceListUIService, 'rescue', 'instance');
  }
}
