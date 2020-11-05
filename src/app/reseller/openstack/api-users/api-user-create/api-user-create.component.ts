import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IApiUserModel } from '@fleio-api/openstack/model/api-user.model';
import { ApiUserListUiService } from '../api-user-list-ui.service';

@Component({
  selector: 'app-api-user-create',
  templateUrl: './api-user-create.component.html',
  styleUrls: ['./api-user-create.component.scss']
})
export class ApiUserCreateComponent extends DetailsBase<IApiUserModel> {
  constructor(route: ActivatedRoute, apiUserListUiService: ApiUserListUiService) {
    super(route, apiUserListUiService, 'create', null);
  }
}
