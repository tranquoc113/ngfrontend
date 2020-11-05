import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../../../shared/ui/objects-view/details-form-base';
import { IBaseFleioObjectModel } from '../../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { FormBuilder, Validators } from '@angular/forms';
import { IOpenstackNotificationsModel } from '../../../../../shared/fleio-api/core/model/openstack-notifications.model';
import { SettingsOpenstackApiService } from '../../../../../shared/fleio-api/core/settings-openstack-api.service';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../../../../../shared/ui-api/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { TestNotificationsDialogComponent } from './dialogs/test-notifications-dialog/test-notifications-dialog.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent extends DetailsFormBase<IBaseFleioObjectModel> {
  notificationsForm = this.formBuilder.group({
    notifications_topic: ['', Validators.required],
    notifications_pool: ['', Validators.required],
    notifications_exchange: ['', Validators.required],
    notifications_url: [''],

  });
  notificationsLoading = false;
  notifications: IOpenstackNotificationsModel;

  constructor(
    private formBuilder: FormBuilder, private settingsOpenstackApi: SettingsOpenstackApiService,
    private notificationService: NotificationService, private matDialog: MatDialog,
  ) {
    super();
  }

  protected initTabData() {
    this.notificationsLoading = true;
    this.settingsOpenstackApi.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
      this.notificationsForm.patchValue({
        notifications_topic: notifications.notifications_topic.join(','),
        notifications_pool: notifications.notifications_pool,
        notifications_exchange: notifications.notifications_exchange.join(','),
      });
      if (notifications.notifications_url) {
        this.notificationsForm.controls.notifications_url.setValue(notifications.notifications_url.join('\n'));
      }
    }).add(() => {
      this.notificationsLoading = false;
    });
  }

  getFormValue() {
    const notifications = {...(this.notificationsForm.value as IOpenstackNotificationsModel)};
    if (!notifications.notifications_url) {
      delete notifications.notifications_url;
    } else {
      notifications.notifications_url = (
        notifications.notifications_url as unknown as string
      ).split('\n');
    }

    notifications.notifications_exchange = (
      notifications.notifications_exchange as unknown as string
    ).split(',');
    notifications.notifications_topic = (
      notifications.notifications_topic as unknown as string
    ).split(',');

    this.notifications = notifications;
  }

  save() {
    this.validate();
    if (this.formGroup.invalid) {
      this.displayControlErrors();
      return EMPTY;
    }

    this.getFormValue();

    return this.settingsOpenstackApi.saveNotifications(this.notifications).pipe(catchError((error) => {
      if (error.error) {
        this.setErrors(error.error);
        return EMPTY;
      } else {
        throw error;
      }
    })).subscribe((response) => {
      this.notificationService.showMessage(response.detail);
    });
  }

  test() {
    this.getFormValue();

    return this.matDialog.open(
      TestNotificationsDialogComponent, {
        data: {
          notifications: this.notifications,
        }
      }).afterClosed().subscribe(() => {
    })
  }
}
