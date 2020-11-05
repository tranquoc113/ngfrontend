import { Component } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IUserModel } from '../../../../shared/fleio-api/client-user/model/user.model';
import { UserListUIService } from '../user-list-ui.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent extends DetailsBase<IUserModel> {
  constructor(route: ActivatedRoute, userListUIService: UserListUIService) {
    super(route, userListUIService, 'create', null);
  }
}
