import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { IBaseFleioObjectModel } from '../../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { debounceTime, switchMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersApiService } from '../../../../../shared/fleio-api/client-user/user/users-api.service';
import { IUserModel } from '../../../../../shared/fleio-api/client-user/model/user.model';
import { IPermission } from '../../../../../shared/fleio-api/core/model/permission.model';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';
import { PermissionsApiService } from '../../../../../shared/fleio-api/core/permissions-api.service';
import { ConfigService } from '../../../../../shared/config/config.service';

@Component({
  selector: 'app-users-authorization',
  templateUrl: './users-authorization.component.html',
  styleUrls: ['./users-authorization.component.scss']
})
export class UsersAuthorizationComponent
  extends DetailsComponentBase<IBaseFleioObjectModel> implements OnInit, OnDestroy {
  userAuthorizationForm = this.formBuilder.group({
    user: ['', Validators.required],
  });
  permissions: {
    implicitly_granted: boolean;
    objects: IPermission[];
  };
  loading = false;
  filteredUsers: IUserModel[] = null;
  effectivePermissions: {
    [key: string]: boolean;
  }
  selectedUser: IUserModel;

  constructor(private formBuilder: FormBuilder, private usersApiService: UsersApiService,
              private notificationService: NotificationService, private permissionsApiService: PermissionsApiService,
              public config: ConfigService) {
    super();
  }

  displayUserFn(user) {
    return user.username || user.id;
  }

  clickedUserInput() {
    this.userAuthorizationForm.get('user').setValue('');
  }

  refreshEffectivePermissions() {
    if (this.selectedUser) {
      this.usersApiService.objectGetAction(this.selectedUser.id, 'fetch_effective_permissions')
        .subscribe(fetchEffectivePermissions => {
          this.effectivePermissions = fetchEffectivePermissions.permissions;
        })
    }
  }

  newUserSelection(event) {
    let user;
    if (event && event.option) {
      user = event.option.value;
    } else {
      user = null;
    }
    this.selectedUser = user;
    if (user && !user.is_superuser) {
      this.refreshAllPermissions();
    }
  }

  refreshAllPermissions() {
    if (this.selectedUser) {
      this.loading = true;
      this.usersApiService.objectGetAction(this.selectedUser.id, 'list_permissions').subscribe(response => {
        this.permissions = response;
        this.loading = false;
        this.refreshEffectivePermissions();
      }, error => {
        this.loading = false;
      })
    }
  }

  checkAll() {
    for (const perm of this.permissions.objects) {
      perm.granted = true;
    }
  }

  unCheckAll() {
    for (const perm of this.permissions.objects) {
      perm.granted = false;
    }
  }

  showPermissionOptions(): boolean {
    return this.permissions && this.permissions.objects && this.selectedUser && !this.selectedUser.is_superuser
  }

  getEffectivePermission(name: string): boolean {
    if (this.effectivePermissions && this.effectivePermissions.hasOwnProperty(name)) {
      return this.effectivePermissions[name];
    }
    return false;
  }

  toggleCheckbox(perm: IPermission) {
    perm.granted = !perm.granted;
  }

  saveUserPermissions() {
    if (!this.selectedUser) {
      this.notificationService.showMessage('Please select an user.');
    }
    this.loading = true;
    if (this.selectedUser.permissions) {
      this.permissionsApiService.updatePermissionsForSet(
        this.selectedUser.permissions.toString(), this.permissions
      ).subscribe(response => {
        this.loading = false;
        this.refreshEffectivePermissions();
        this.notificationService.showMessage(response.detail);
      }, error => {
        this.loading = false;
        this.notificationService.showMessage(error.error.detail);
      });
    } else {
      this.usersApiService.generatePermissionsSet(
        this.selectedUser.id, this.permissions
      ).subscribe(response => {
        this.loading = false;
        this.notificationService.showMessage('User permissions generated');
        this.selectedUser.permissions = response.permissions_set;
        this.refreshAllPermissions();
      }, error => {
        this.loading = false;
        this.notificationService.showMessage(error.error.detail);
      });
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.userAuthorizationForm.get('user').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.usersApiService.list({
          search: value,
        }).pipe()),
      ).subscribe((users: { objects: IUserModel[] }) => {
      this.filteredUsers = users.objects;
    });
  }

}
