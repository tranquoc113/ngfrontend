import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IApiUserModel } from '@fleio-api/openstack/model/api-user.model';

@Component({
  selector: 'app-api-user-details-overview',
  templateUrl: './api-user-details-overview.component.html',
  styleUrls: ['./api-user-details-overview.component.scss']
})
export class ApiUserDetailsOverviewComponent extends DetailsComponentBase<IApiUserModel> {

  constructor() {
    super();
  }
}
