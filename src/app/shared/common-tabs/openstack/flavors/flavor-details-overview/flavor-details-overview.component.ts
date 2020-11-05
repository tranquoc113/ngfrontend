import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';

@Component({
  selector: 'app-flavor-details-overview',
  templateUrl: './flavor-details-overview.component.html',
  styleUrls: ['./flavor-details-overview.component.scss']
})
export class FlavorDetailsOverviewComponent extends DetailsComponentBase<IFlavorModel> {
  constructor() {
    super();
  }
}
