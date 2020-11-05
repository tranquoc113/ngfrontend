import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IFlavorGroupModel } from '@fleio-api/openstack/model/flavor-group.model';
import { ActivatedRoute } from '@angular/router';
import { FlavorGroupListUiService } from '../flavor-group-list-ui.service';

@Component({
  selector: 'app-flavor-group-details',
  templateUrl: './flavor-group-details.component.html',
  styleUrls: ['./flavor-group-details.component.scss']
})
export class FlavorGroupDetailsComponent extends DetailsBase<IFlavorGroupModel> {

  constructor(route: ActivatedRoute, flavorGroupListUiService: FlavorGroupListUiService) {
    super(route, flavorGroupListUiService, 'details', 'flavorGroup');
  }
}
