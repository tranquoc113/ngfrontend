import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { ActivatedRoute } from '@angular/router';
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
