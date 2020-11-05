import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClientModel } from '../../../../../../fleio-api/client-user/model/client.model';
import { ClientsApiService } from '../../../../../../fleio-api/client-user/client/clients-api.service';
import { NotificationService } from '../../../../../../ui-api/notification.service';
import { IUserModel } from '../../../../../../fleio-api/client-user/model/user.model';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-associate-user-dialog',
  templateUrl: './associate-user-dialog.component.html',
  styleUrls: ['./associate-user-dialog.component.scss']
})
export class AssociateUserDialogComponent implements OnInit {
  associateUserForm = this.formBuilder.group({
    selectedUser: [null, Validators.required]
  });

  selectedUser = this.associateUserForm.controls.selectedUser;
  availableUsers: IUserModel[];

  constructor(
    public dialogRef: MatDialogRef<AssociateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: IClientModel },
    private formBuilder: FormBuilder,
    private clientsApi: ClientsApiService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    if (this.data && this.data.client) {
      this.clientsApi.objectGetAction(this.data.client.id, 'get_users_not_in_client').subscribe(users => {
        this.availableUsers = users.users;
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  associateUser() {
    this.clientsApi.objectPostAction(this.data.client.id, 'associate_user', {
      id: this.data.client.id,
      user_id: this.selectedUser.value,
    }).pipe(
      catchError(() => {
        this.notificationService.showMessage('Failed to associate user');
        return EMPTY;
      }),
    ).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
