import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../ui/objects-view/details-component-base';
import { IInvoiceModel } from '../../../../fleio-api/billing/model/invoice.model';
import { ConfigService } from '../../../../config/config.service';
import { IUserGroupModel } from '../../../../fleio-api/client-user/model/user-group.model';
import { IUserModel } from '../../../../fleio-api/client-user/model/user.model';
import { UsersApiService } from '../../../../fleio-api/client-user/user/users-api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserToGroupDialogComponent } from './add-user-to-group-dialog/add-user-to-group-dialog.component';
import { FleioId } from '../../../../fleio-api/base-model/base-fleio-object.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationService } from '../../../../ui-api/notification.service';
import { CallbackAction } from '../../../../ui/objects-view/actions/callback-action';

@Component({
  selector: 'app-user-details-groups',
  templateUrl: './user-details-groups.component.html',
  styleUrls: ['./user-details-groups.component.scss']
})
export class UserDetailsGroupsComponent extends DetailsComponentBase<IUserModel> implements OnInit {
  invoices: IInvoiceModel[];
  displayedColumns: string[] = ['id', 'name', '(actions)'];
  userGroups: Array<IUserGroupModel> = [];

  userGroupActions: {
    [userGroupId: number]: [];
  } = {};

  getUserGroupActions(userGroupId) {
    return [
      new CallbackAction({
        object: this.object,
        icon: {name: 'link_off'},
        tooltip: 'Remove from group',
        name: 'Remove from group',
        callback: action => {
            return this.removeUserFromGroup(userGroupId);
          }
        }
      ),
    ]
  }

  removeUserFromGroup(userGroupId: FleioId) {
    let dialogResult$: Observable<string>;
    dialogResult$ = this.notificationService.confirmDialog({
        title: 'This will remove the user from the group',
        message: 'Are you sure?',
      });
    dialogResult$.subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.usersApiService.removeFromGroup(this.object.id, userGroupId).pipe(map(success => {
          if (success) {
            this.notificationService.showMessage('User removed from group.');
            this.refreshData();
          } else {
            this.notificationService.showMessage('Could not remove user from group.');
          }
        })).subscribe();
      }
    });
    return of(null);
  }

  addToGroup() {
    this.matDialog.open(
      AddUserToGroupDialogComponent, {
        data: {user: this.object}
      }
    ).afterClosed().subscribe(result => {
      if (result) {
        this.refreshData();
      }
    });
  }

  protected refreshData() {
    this.usersApiService.get(this.object.id).subscribe(user => {
      this.objectController.object = user;
      this.updateUserGroups();
    });
  }

  constructor(
    public config: ConfigService,
    private usersApiService: UsersApiService,
    private matDialog: MatDialog,
    private notificationService: NotificationService
  ) {
    super();
  }

  updateUserGroups() {
    if (this.object) {
      this.userGroups = this.object.user_groups;
    }
    for (const group of this.userGroups) {
      this.userGroupActions[group.id] = this.getUserGroupActions(group.id);
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.updateUserGroups();
  }
}
