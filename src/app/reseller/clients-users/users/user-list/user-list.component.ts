import { Component, OnInit } from '@angular/core';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { IUserModel } from '../../../../shared/fleio-api/client-user/model/user.model';
import { UserListUIService } from '../user-list-ui.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends ListBase<IUserModel> implements OnInit {
  constructor(
    private route: ActivatedRoute, private userListUIService: UserListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, userListUIService, refreshService, 'users');
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
