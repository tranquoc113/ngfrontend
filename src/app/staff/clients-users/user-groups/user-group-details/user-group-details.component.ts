import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IUserGroupModel } from '@fleio-api/client-user/model/user-group.model';
import { ActivatedRoute } from '@angular/router';
import { UserGroupListUiService } from '../user-group-list-ui.service';

@Component({
  selector: 'app-user-group-details',
  templateUrl: './user-group-details.component.html',
  styleUrls: ['./user-group-details.component.scss']
})
export class UserGroupDetailsComponent extends DetailsBase<IUserGroupModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, userGroupListUiService: UserGroupListUiService) {
    super(route, userGroupListUiService, 'details', 'userGroup');
  }
}
