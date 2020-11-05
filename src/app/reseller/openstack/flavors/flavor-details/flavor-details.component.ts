import { Component } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IFlavorModel } from '../../../../shared/fleio-api/openstack/model/flavor.model';
import { FlavorListUIService } from '../flavor-list-ui.service';

@Component({
  selector: 'app-flavor-details',
  templateUrl: './flavor-details.component.html',
  styleUrls: ['./flavor-details.component.scss']
})
export class FlavorDetailsComponent extends DetailsBase<IFlavorModel> {
  constructor(route: ActivatedRoute, flavorListUIService: FlavorListUIService) {
    super(route, flavorListUIService, 'details', 'flavor');
  }
}
