import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../ui/objects-view/details-component-base';
import { IClientModel } from '../../../../fleio-api/client-user/model/client.model';
import { ClientsApiService } from '../../../../fleio-api/client-user/client/clients-api.service';
import { IAction } from '../../../../ui/objects-view/interfaces/actions/action';
import { RouterLinkAction } from '../../../../ui/objects-view/actions/router-link-action';
import { ConfigService } from '../../../../config/config.service';
import { Router } from '@angular/router';
import { ApiCallAction, CallType } from '../../../../ui/objects-view/actions/api-call-action';
import { MatDialog } from '@angular/material/dialog';
import { AssociateUserDialogComponent } from './dialogs/associate-user-dialog/associate-user-dialog.component';
import { IUserModel } from '@fleio-api/client-user/model/user.model';

@Component({
  selector: 'app-client-details-users',
  templateUrl: './client-details-users.component.html',
  styleUrls: ['./client-details-users.component.scss']
})
export class ClientDetailsUsersComponent extends DetailsComponentBase<IClientModel> implements OnInit {
  users: IUserModel[];
  displayedColumns: string[] = ['username', 'full_name', '(actions)'];

  usersActions = {};

  constructor(
    private clientsApi: ClientsApiService,
    public config: ConfigService,
    private router: Router,
    private matDialog: MatDialog,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setupRefreshTimer(3000);
  }

  protected refreshData() {
    this.clientsApi.objectGetAction(this.object.id, 'get_users').subscribe(users => {
      this.users = users.users;
      this.usersActions = {};
      for (const user of this.users) {
        this.usersActions[user.id] = this.getUserActions(user);
      }
    });
  }

  getUserActions(user: IUserModel): IAction[] {
    return [
      new RouterLinkAction({
        icon: {name: 'face'},
        tooltip: 'Impersonate user',
        name: 'Impersonate user',
        routerUrl: this.config.getPanelUrl(`clients-users/users/${user.id}/impersonate`),
        router: this.router,
      }),
      new ApiCallAction({
        icon: {name: 'link_off'},
        tooltip: 'Dissociate user',
        name: 'Dissociate user',
        confirmOptions: {
          confirm: true,
          title: 'Dissociate user',
          message: `Are you sure you want to dissociate user ${user.full_name}`,
        },
        object: this.object,
        apiService: this.clientsApi,
        callType: CallType.Post,
        apiAction: 'dissociate_user',
        apiParams: {
          id: this.object.id,
          user_id: user.id,
        },
      }),
    ];
  }

  associateNewUser() {
    this.matDialog.open(
      AssociateUserDialogComponent, {
        data: {client: this.object}
      }
    ).afterClosed().subscribe(result => {
      if (result) {
        this.refreshData();
      }
    });
  }
}
