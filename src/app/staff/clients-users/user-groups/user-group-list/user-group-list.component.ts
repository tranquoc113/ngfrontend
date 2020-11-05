import { Component } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IUserGroupModel } from '@fleio-api/client-user/model/user-group.model';
import { UserGroupListUiService } from '../user-group-list-ui.service';

@Component({
  selector: 'app-user-group-list',
  templateUrl: './user-group-list.component.html',
  styleUrls: ['./user-group-list.component.scss']
})
export class UserGroupListComponent extends ListBase<IUserGroupModel> {

  constructor(
    private route: ActivatedRoute, private userGroupListUiService: UserGroupListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, userGroupListUiService, refreshService, 'userGroups');
  }
}
