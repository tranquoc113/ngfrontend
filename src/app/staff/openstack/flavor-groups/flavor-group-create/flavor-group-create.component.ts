import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IFlavorGroupModel } from '@fleio-api/openstack/model/flavor-group.model';
import { FlavorGroupListUiService } from '../flavor-group-list-ui.service';

@Component({
  selector: 'app-flavor-group-create',
  templateUrl: './flavor-group-create.component.html',
  styleUrls: ['./flavor-group-create.component.scss']
})
export class FlavorGroupCreateComponent extends DetailsBase<IFlavorGroupModel> {

  constructor(route: ActivatedRoute, flavorGroupListUiService: FlavorGroupListUiService) {
    super(route, flavorGroupListUiService, 'create', null);
  }
}
