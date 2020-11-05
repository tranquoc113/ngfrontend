import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { IUserModel } from '../../../../shared/fleio-api/client-user/model/user.model';
import { UserListUIService } from '../user-list-ui.service';
import { UsersApiService } from '../../../../shared/fleio-api/client-user/user/users-api.service';
import { AppLocalStorageService } from '../../../../shared/ui-api/app-local-storage.service';
import { ConfigService } from '../../../../shared/config/config.service';

@Component({
  selector: 'app-user-impersonate',
  templateUrl: './user-impersonate.component.html',
  styleUrls: ['./user-impersonate.component.scss']
})
export class UserImpersonateComponent extends DetailsBase<IUserModel> implements OnInit {
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
        let currentPath = window.location.href;
        currentPath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
        this.appLocalStorage.setItem('fleio.flStaffBackend', this.config.getPanelApiUrl(''), false);
        this.appLocalStorage.setItem('fleio.flStaffUrl', currentPath, false);
        if (this.object.is_reseller) {
          window.location.href = this.config.current.urls.resellerUrl;
        } else {
          window.location.href = this.config.current.urls.enduserUrl;
        }
      });
    }
  }
}
