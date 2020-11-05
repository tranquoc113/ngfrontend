import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClientModel } from '../../../../../../fleio-api/client-user/model/client.model';
import { ClientsApiService } from '../../../../../../fleio-api/client-user/client/clients-api.service';
import { NotificationService } from '../../../../../../ui-api/notification.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { IConfigurationModel } from '../../../../../../fleio-api/configurations/model/configuration.model';

@Component({
  selector: 'app-change-configuration-dialog',
  templateUrl: './change-configuration-dialog.component.html',
  styleUrls: ['./change-configuration-dialog.component.scss']
})
export class ChangeConfigurationDialogComponent implements OnInit {
  changeConfigurationFrom = this.formBuilder.group({
    selectedConfiguration: [null, Validators.required]
  });

  selectedConfiguration = this.changeConfigurationFrom.controls.selectedConfiguration;
  availableConfigurations: IConfigurationModel[];

  constructor(
    public dialogRef: MatDialogRef<ChangeConfigurationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      client: IClientModel,
      configuration: IConfigurationModel,
    },
    private formBuilder: FormBuilder,
    private clientsApi: ClientsApiService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    if (this.data && this.data.client) {
      this.clientsApi.objectGetAction(
        this.data.client.id,
        'get_configurations_for_client',
      ).subscribe(availableConfigurations => {
        this.availableConfigurations = availableConfigurations.configurations;
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  changeConfiguration() {
    this.clientsApi.objectPostAction(this.data.client.id, 'change_configuration', {
      id: this.data.client.id,
      configuration: this.selectedConfiguration.value,
    }).pipe(
      catchError(() => {
        this.notificationService.showMessage('Failed to change configuration');
        return EMPTY;
      }),
    ).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
