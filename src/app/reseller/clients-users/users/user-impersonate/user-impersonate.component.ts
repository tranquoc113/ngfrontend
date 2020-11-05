import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../../../../shared/fleio-api/client-user/user/users-api.service';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IUserModel } from '../../../../shared/fleio-api/client-user/model/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserListUIService } from '../user-list-ui.service';
import { AppLocalStorageService } from '../../../../shared/ui-api/app-local-storage.service';
import { ConfigService } from '../../../../shared/config/config.service';

@Component({
  selector: 'app-user-impersonate',
  templateUrl: './user-impersonate.component.html',
  styleUrls: ['./user-impersonate.component.scss']
})
export class UserImpersonateComponent extends DetailsBase<IUserModel> implements OnInit {
  impersonated = false;

  constructor(
    route: ActivatedRoute,
    userListUIService: UserListUIService,
    private usersApi: UsersApiService,
    private appLocalStorage: AppLocalStorageService,
    private config: ConfigService,
  ) {
    super(route, userListUIService, 'edit', 'user');
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.object) {
      this.usersApi.objectPostAction(this.object.id, 'impersonate', {
        action: 'impersonate'
      }).subscribe(impersonationData => {
        this.appLocalStorage.setItem('fleio.flStaffBackend', this.config.getPanelApiUrl(''));
        this.appLocalStorage.setItem('fleio.flStaffUrl', this.config.getPanelHomeUrl());
        if (impersonationData.enduser_panel_url) {
          window.location = impersonationData.enduser_panel_url;
        }

        this.impersonated = true;
      });
    }
  }
}
