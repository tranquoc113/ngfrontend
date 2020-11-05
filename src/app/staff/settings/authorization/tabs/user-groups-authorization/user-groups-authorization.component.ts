import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { IBaseFleioObjectModel } from '../../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { FormBuilder, Validators } from '@angular/forms';
import { IPermission } from '../../../../../shared/fleio-api/core/model/permission.model';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';
import { PermissionsApiService } from '../../../../../shared/fleio-api/core/permissions-api.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { IUserGroupModel } from '../../../../../shared/fleio-api/client-user/model/user-group.model';
import { UserGroupsApiService } from '../../../../../shared/fleio-api/client-user/user-group/user-groups-api.service';

@Component({
  selector: 'app-user-groups-authorization',
  templateUrl: './user-groups-authorization.component.html',
  styleUrls: ['./user-groups-authorization.component.scss']
})
export class UserGroupsAuthorizationComponent
  extends DetailsComponentBase<IBaseFleioObjectModel> implements OnInit, OnDestroy {
  userGroupAuthorizationForm = this.formBuilder.group({
    userGroup: ['', Validators.required],
  });
  permissions: {
    implicitly_granted: boolean;
    objects: IPermission[];
  };
  loading = false;
  filteredUserGroups: IUserGroupModel[] = null;
  selectedUserGroup: IUserGroupModel;

  constructor(private formBuilder: FormBuilder, private userGroupsApiService: UserGroupsApiService,
              private notificationService: NotificationService, private permissionsApiService: PermissionsApiService) {
    super();
  }

  displayUserGroupFn(group) {
    return group.name || group.id;
  }

  clickedUserGroupInput() {
    this.userGroupAuthorizationForm.get('userGroup').setValue('');
  }

  newUserSelection(event) {
    let userGroup;
    if (event && event.option) {
      userGroup = event.option.value;
    } else {
      userGroup = null;
    }
    this.selectedUserGroup = userGroup;
    this.refreshAllPermissions();
  }

  refreshAllPermissions() {
    if (this.selectedUserGroup) {
      this.loading = true;
      this.userGroupsApiService.objectGetAction(this.selectedUserGroup.id, 'list_permissions')
        .subscribe(response => {
          this.permissions = response;
          this.loading = false;
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

  showPermissionOptions() {
    return this.permissions && this.permissions.objects && this.selectedUserGroup;
  }

  toggleCheckbox(perm: IPermission) {
    perm.granted = !perm.granted;
  }

  saveUserGroupPermissions() {
    if (!this.selectedUserGroup) {
      this.notificationService.showMessage('Please select an user group.');
    }
    this.loading = true;
    if (this.selectedUserGroup.permissions) {
      this.permissionsApiService.updatePermissionsForSet(
        this.selectedUserGroup.permissions.toString(), this.permissions
      ).subscribe(response => {
        this.loading = false;
        this.notificationService.showMessage(response.detail);
      }, error => {
        this.loading = false;
        this.notificationService.showMessage(error.error.detail);
      });
    } else {
      this.userGroupsApiService.generatePermissionsSet(
        this.selectedUserGroup.id, this.permissions
      ).subscribe(response => {
        this.loading = false;
        this.notificationService.showMessage('User group permissions generated');
        this.selectedUserGroup.permissions = response.permissions_set;
        this.refreshAllPermissions();
      }, error => {
        this.loading = false;
        this.notificationService.showMessage(error.error.detail);
      });
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.userGroupAuthorizationForm.get('userGroup').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.userGroupsApiService.list({
          search: value,
        }).pipe()),
      ).subscribe((usersGroups: { objects: IUserGroupModel[] }) => {
      this.filteredUserGroups = usersGroups.objects;
    });
  }

}
