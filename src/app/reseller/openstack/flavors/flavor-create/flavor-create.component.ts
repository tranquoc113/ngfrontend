import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IFlavorModel } from '../../../../shared/fleio-api/openstack/model/flavor.model';
import { ActivatedRoute } from '@angular/router';
import { FlavorListUIService } from '../flavor-list-ui.service';

@Component({
  selector: 'app-flavor-create',
  templateUrl: './flavor-create.component.html',
  styleUrls: ['./flavor-create.component.scss']
})
export class FlavorCreateComponent extends DetailsBase<IFlavorModel> {
  constructor(route: ActivatedRoute, flavorListUIService: FlavorListUIService) {
    super(route, flavorListUIService, 'create', null);
  }
}
