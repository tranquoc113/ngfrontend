import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../ui/objects-view/details-component-base';
import { IUserModel } from '../../../../fleio-api/client-user/model/user.model';

@Component({
  selector: 'app-user-details-overview',
  templateUrl: './user-details-overview.component.html',
  styleUrls: ['./user-details-overview.component.scss']
})
export class UserDetailsOverviewComponent extends DetailsComponentBase<IUserModel> {

  constructor() {
    super();
  }
}
