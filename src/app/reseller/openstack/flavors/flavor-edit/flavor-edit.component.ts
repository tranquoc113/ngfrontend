import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IFlavorModel } from '../../../../shared/fleio-api/openstack/model/flavor.model';
import { ActivatedRoute } from '@angular/router';
import { FlavorListUIService } from '../flavor-list-ui.service';

@Component({
  selector: 'app-flavor-edit',
  templateUrl: './flavor-edit.component.html',
  styleUrls: ['./flavor-edit.component.scss']
})
export class FlavorEditComponent extends DetailsBase<IFlavorModel> {
  constructor(route: ActivatedRoute, flavorListUIService: FlavorListUIService) {
    super(route, flavorListUIService, 'edit', 'flavor');
  }
}
