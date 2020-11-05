import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IApiUserModel } from '@fleio-api/openstack/model/api-user.model';
import { ApiUserListUiService } from '../api-user-list-ui.service';

@Component({
  selector: 'app-api-user-edit',
  templateUrl: './api-user-edit.component.html',
  styleUrls: ['./api-user-edit.component.scss']
})
export class ApiUserEditComponent extends DetailsBase<IApiUserModel> {
  constructor(route: ActivatedRoute, apiUserListUiService: ApiUserListUiService) {
    super(route, apiUserListUiService, 'edit', 'apiUser');
  }
}
