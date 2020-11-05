import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../../shared/ui/objects-view/details-form-base';
import { IBaseFleioObjectModel } from '../../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { FormBuilder, Validators } from '@angular/forms';
import { SettingsOpenstackApiService } from '../../../../../shared/fleio-api/core/settings-openstack-api.service';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IOpenstackCredentialsModel } from '../../../../../shared/fleio-api/core/model/openstack-credentials.model';
import { TestCredentialsDialogComponent } from './dialogs/test-credentials-dialog/test-credentials-dialog.component';
import { ApiUserDownloadOpenrcComponent } from '../../../../../shared/common-dialogs/openstack/api-users/api-user-download-openrc/api-user-download-openrc.component';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent extends DetailsFormBase<IBaseFleioObjectModel> {
  credentialsForm = this.formBuilder.group({
    auth_url: ['', Validators.required],
    default_interface: ['public', Validators.required],
    user_domain_id: ['', Validators.required],
    user_project_id: ['', Validators.required],
    require_valid_ssl: [false],
    username: ['', Validators.required],
    password: [''],
  });
  credentialsLoading = false;
  credentials: IOpenstackCredentialsModel;
  interfaceOptions = [
    {name: 'public', display: 'Public'},
    {name: 'admin', display: 'Admin'},
    {name: 'private', display: 'Private'},
  ]

  constructor(
    private formBuilder: FormBuilder, private settingsOpenstackApi: SettingsOpenstackApiService,
    private notificationService: NotificationService, private matDialog: MatDialog,
  ) {
    super();
  }

  protected initTabData() {
    this.credentialsLoading = true;
    this.settingsOpenstackApi.getCredentials().subscribe(credentials => {
      this.credentials = credentials;
      this.credentialsForm.patchValue(credentials);
    }).add(() => {
      this.credentialsLoading = false;
    });
  }

  getFormValue() {
    const credentials = this.credentialsForm.value as IOpenstackCredentialsModel;
    if (!credentials.password) {
      delete credentials.password;
    }

    this.credentials = credentials;
  }

  saveAndSync() {
    this.validate();
    if (this.formGroup.invalid) {
      this.displayControlErrors();
      return EMPTY;
    }

    this.getFormValue();

    this.credentialsLoading = true;
    return this.settingsOpenstackApi.saveCredentials(this.credentials).pipe(catchError((error) => {
      if (error.error) {
        this.setErrors(error.error);
        return EMPTY;
      } else {
        throw error;
      }
    })).subscribe((response) => {
      this.notificationService.showMessage(response.detail);
    }).add(() => this.credentialsLoading = false);
  }

  test() {
    this.getFormValue();

    return this.matDialog.open(
      TestCredentialsDialogComponent, {
        data: {
          credentials: this.credentials,
        }
      }).afterClosed().subscribe(result => {
      if (result === 'save') {
        this.saveAndSync();
      }
    })
  }

  getOpenrcFile() {
    this.getFormValue();

    return this.matDialog.open(
      ApiUserDownloadOpenrcComponent, {
        data: {
          apiUser: {
            default_project_id: this.credentials.user_project_id,
            domain_id: this.credentials.user_domain_id,
            name: this.credentials.username,
          }
        }
      });
  }
}
