import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { ActivatedRoute } from '@angular/router';
import { InstanceListUIService } from '../instance-list-ui.service';

@Component({
  selector: 'app-instance-rebuild',
  templateUrl: './instance-rebuild.component.html',
  styleUrls: ['./instance-rebuild.component.scss']
})
export class InstanceRebuildComponent extends DetailsBase<IInstanceModel> {
  constructor(route: ActivatedRoute, instanceListUIService: InstanceListUIService) {
    super(route, instanceListUIService, 'rebuild', 'instance');
  }
}
