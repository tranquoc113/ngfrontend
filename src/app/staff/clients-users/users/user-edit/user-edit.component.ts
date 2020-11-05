import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IUserModel } from '../../../../shared/fleio-api/client-user/model/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserListUIService } from '../user-list-ui.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends DetailsBase<IUserModel> {
  constructor(route: ActivatedRoute, userListUIService: UserListUIService) {
    super(route, userListUIService, 'edit', 'user');
  }
}
