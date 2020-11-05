import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IUserGroupModel } from '@fleio-api/client-user/model/user-group.model';
import { ConfigService } from '@shared/config/config.service';
import { UsersApiService } from '@fleio-api/client-user/user/users-api.service';
import { IUserModel } from '@fleio-api/client-user/model/user.model';
import { IAction } from '@objects-view/interfaces/actions/action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-user-group-details-overview',
  templateUrl: './user-group-details-overview.component.html',
  styleUrls: ['./user-group-details-overview.component.scss']
})
export class UserGroupDetailsOverviewComponent extends DetailsComponentBase<IUserGroupModel> implements OnInit {
  users: IUserModel[];
  userActions: { [id: number]: IAction };
  displayedColumns = ['id', 'username', 'full_name', '(actions)'];
  currentPage = 1;
  nextPage = false;
  previousPage = false;
  loading = false;

  userForm = this.formBuilder.group({
    user: [''],
  });
  filteredUsers$: Observable<IUserModel[]>;


  constructor(
    public config: ConfigService,
    private usersApiService: UsersApiService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
  ) {
    super();
  }

  displayUser(user) {
    return user.username || user.id;
  }

  clearUserInput() {
    this.userForm.get('user').setValue('');
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.object) {
      this.loadUsers(this.currentPage);
    }

    this.filteredUsers$ = this.userForm.controls.user.valueChanges.pipe(
      startWith(''),
      map(value => {
        return typeof value === 'string' ? value : value.id;
      }),
      mergeMap(value => {
        return this.usersApiService.getAvailableUsersForGroup(
          this.object.id, value,
        ).pipe(map(usersList => usersList.objects));
      })
    );

  }

  changePage(action: string) {
    if (action === 'next') {
      this.currentPage = this.currentPage + 1;
      this.loadUsers(this.currentPage);
    }
    if (action === 'previous') {
      this.currentPage = this.currentPage - 1;
      this.loadUsers(this.currentPage);
    }
  };

  loadUsers(page: number) {
    this.loading = true;
    this.usersApiService.getUsersInGroup(this.object.id, page).subscribe(response => {
      this.users = response.objects;
      this.userActions = {}
      for (const user of this.users) {
        this.userActions[user.id] = this.getUserActions(user);
      }

      this.nextPage = !!response.next;
      this.previousPage = !!response.previous;
      this.loading = false;
    });
  }

  getUserActions(user: IUserModel): IAction[] {
    return [
      new CallbackAction({
        icon: {name: 'link_off'},
        tooltip: 'Remove user from group',
        name: 'Remove user from group',
        options: {displayMessages: false, displayConfirmation: true},
        confirmOptions: {
          confirm: true,
          title: 'Remove user from group',
          message: `Are you sure you want to remove user ${user.username} from group`,
        },
        refreshAfterExecute: true,
        callback: () => {
          return this.usersApiService.removeFromGroup(user.id, this.object.id).pipe(map(() => {
            this.loadUsers(this.currentPage);
            return null;
          }));
        }
      }),
    ];
  }

  addUserToGroup() {
    const user = this.userForm.controls.user.value as IUserModel
    this.usersApiService.addToGroup(user.id, this.object.id).subscribe(
      (response) => {
        this.loadUsers(this.currentPage);
        this.clearUserInput();
        this.notificationService.showMessage(response.detail);
      },
      () => {
        this.notificationService.showMessage('Failed to add user to group')
      }
    )
  }
}
