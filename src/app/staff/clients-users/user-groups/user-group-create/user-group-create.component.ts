import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IUserGroupModel } from '@fleio-api/client-user/model/user-group.model';
import { ActivatedRoute } from '@angular/router';
import { UserGroupListUiService } from '../user-group-list-ui.service';

@Component({
  selector: 'app-user-group-create',
  templateUrl: './user-group-create.component.html',
  styleUrls: ['./user-group-create.component.scss']
})
export class UserGroupCreateComponent extends DetailsBase<IUserGroupModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, userGroupListUiService: UserGroupListUiService) {
    super(route, userGroupListUiService, 'create', null);
  }
}
