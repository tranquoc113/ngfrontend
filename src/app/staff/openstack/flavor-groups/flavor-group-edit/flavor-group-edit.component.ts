import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IFlavorGroupModel } from '@fleio-api/openstack/model/flavor-group.model';
import { FlavorGroupListUiService } from '../flavor-group-list-ui.service';

@Component({
  selector: 'app-flavor-group-edit',
  templateUrl: './flavor-group-edit.component.html',
  styleUrls: ['./flavor-group-edit.component.scss']
})
export class FlavorGroupEditComponent extends DetailsBase<IFlavorGroupModel> {

  constructor(route: ActivatedRoute, flavorGroupListUiService: FlavorGroupListUiService) {
    super(route, flavorGroupListUiService, 'edit', 'flavorGroup');
  }
}
