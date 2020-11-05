import { Component } from '@angular/core';
import { InstanceListUIService } from '../instance-list-ui.service';
import { ActivatedRoute } from '@angular/router';
import { DetailsBase } from '@objects-view/details-base';
import { IInstanceModel } from '@fleio-api/openstack/model/instance.model';

@Component({
  selector: 'app-instance-details',
  templateUrl: './instance-details.component.html',
  styleUrls: ['./instance-details.component.scss']
})
export class InstanceDetailsComponent extends DetailsBase<IInstanceModel> {
  constructor(route: ActivatedRoute, instanceListUIService: InstanceListUIService) {
    super(route, instanceListUIService, 'details', 'instance', ['permissions']);
  }
}
