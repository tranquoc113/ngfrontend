import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { ActivatedRoute } from '@angular/router';
import { FlavorListUIService } from '../flavor-list-ui.service';

@Component({
  selector: 'app-show-to-client-groups',
  templateUrl: './show-to-client-groups.component.html',
  styleUrls: ['./show-to-client-groups.component.scss']
})
export class ShowToClientGroupsComponent extends DetailsBase<IFlavorModel> {
  constructor(route: ActivatedRoute, flavorListUIService: FlavorListUIService) {
    super(route, flavorListUIService, 'show-to-client-groups', 'flavor');
  }
}
