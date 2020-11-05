import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { UserGroupListUiService } from '../user-group-list-ui.service';
import { IUserGroupModel } from '@fleio-api/client-user/model/user-group.model';

@Component({
  selector: 'app-user-group-edit',
  templateUrl: './user-group-edit.component.html',
  styleUrls: ['./user-group-edit.component.scss']
})
export class UserGroupEditComponent extends DetailsBase<IUserGroupModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, userGroupListUiService: UserGroupListUiService) {
    super(route, userGroupListUiService, 'edit', 'userGroup');
  }
}
