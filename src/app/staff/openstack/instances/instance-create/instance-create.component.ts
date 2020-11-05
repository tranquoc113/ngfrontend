import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';
import { InstanceListUIService } from '../instance-list-ui.service';

@Component({
  selector: 'app-instance-create',
  templateUrl: './instance-create.component.html',
  styleUrls: ['./instance-create.component.scss']
})
export class InstanceCreateComponent extends DetailsBase<IInstanceModel> {
  constructor(route: ActivatedRoute, instanceListUIService: InstanceListUIService) {
    super(route, instanceListUIService, 'create', null);
  }
}
