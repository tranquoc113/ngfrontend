import { Component, OnInit } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { ApiUserListUiService } from '../api-user-list-ui.service';
import { IApiUserModel } from '@fleio-api/openstack/model/api-user.model';

@Component({
  selector: 'app-api-user-list',
  templateUrl: './api-user-list.component.html',
  styleUrls: ['./api-user-list.component.scss']
})
export class ApiUserListComponent extends ListBase<IApiUserModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private apiUserListUiService: ApiUserListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, apiUserListUiService, refreshService, 'apiUsers');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
