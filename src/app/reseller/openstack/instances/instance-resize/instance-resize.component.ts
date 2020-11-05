import { Component } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IInstanceModel } from '../../../../shared/fleio-api/openstack/model/instance.model';
import { ActivatedRoute } from '@angular/router';
import { InstanceListUIService } from '../instance-list-ui.service';

@Component({
  selector: 'app-instance-resize',
  templateUrl: './instance-resize.component.html',
  styleUrls: ['./instance-resize.component.scss']
})
export class InstanceResizeComponent extends DetailsBase<IInstanceModel> {
  constructor(route: ActivatedRoute, instanceListUIService: InstanceListUIService) {
    super(route, instanceListUIService, 'resize', 'instance');
  }
}
