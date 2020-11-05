import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IApiUserModel } from '@fleio-api/openstack/model/api-user.model';
import { ApiUserListUiService } from '../api-user-list-ui.service';

@Component({
  selector: 'app-api-user-details',
  templateUrl: './api-user-details.component.html',
  styleUrls: ['./api-user-details.component.scss']
})
export class ApiUserDetailsComponent extends DetailsBase<IApiUserModel> {
  constructor(route: ActivatedRoute, apiUserListUiService: ApiUserListUiService) {
    super(route, apiUserListUiService, 'details', 'apiUser');
  }
}
