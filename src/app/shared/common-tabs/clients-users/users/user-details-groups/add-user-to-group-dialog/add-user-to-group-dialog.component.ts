import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUserModel } from '../../../../../fleio-api/client-user/model/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../../ui-api/notification.service';
import { IUserGroupModel } from '../../../../../fleio-api/client-user/model/user-group.model';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { UserGroupsApiService } from '../../../../../fleio-api/client-user/user-group/user-groups-api.service';
import { EMPTY } from 'rxjs';
import { UsersApiService } from '../../../../../fleio-api/client-user/user/users-api.service';

@Component({
  selector: 'app-add-user-to-group-dialog',
  templateUrl: './add-user-to-group-dialog.component.html',
  styleUrls: ['./add-user-to-group-dialog.component.scss']
})
export class AddUserToGroupDialogComponent implements OnInit {
  associateUserForm = this.formBuilder.group({
    selectedUserGroup: [null, Validators.required]
  });
  selectedUserGroup = this.associateUserForm.controls.selectedUserGroup;
  filteredUserGroups: Array<IUserGroupModel>;

  constructor(
    public dialogRef: MatDialogRef<AddUserToGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: IUserModel },
    private formBuilder: FormBuilder,
    private userGroupsApiService: UserGroupsApiService,
    private usersApiService: UsersApiService,
    private notificationService: NotificationService,
  ) {
  }

  displayUserGroupFn(group: any) {
    if (group) {
      return group.name || group.id;
    }
    return '';
  }

  clickedGroupInput() {
    this.associateUserForm.get('selectedUserGroup').setValue('');
  }

  ngOnInit() {
    this.associateUserForm.get('selectedUserGroup').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.userGroupsApiService.getGroupsAvailableForUser(
          this.data.user.id,
          value
        ).pipe()),
      ).subscribe((groups: {objects: IUserGroupModel[]}) => {
        this.filteredUserGroups = groups.objects;
      });
  }

  close() {
    this.dialogRef.close(false);
  }

  associateUser() {
    this.usersApiService.addToGroup(this.data.user.id, this.selectedUserGroup.value.id).pipe(
      catchError(() => {
        this.notificationService.showMessage('Failed to add user to group');
        return EMPTY;
      }),
    ).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
