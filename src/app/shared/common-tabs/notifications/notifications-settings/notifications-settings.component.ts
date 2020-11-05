import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailsFormBase } from '../../../ui/objects-view/details-form-base';
import { UserNotificationsApiService } from '../../../fleio-api/notifications/user-notifications-api.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../config/config.service';
import { of } from 'rxjs';
import { IUserNotificationSettingsResponseModel } from '../../../fleio-api/notifications/model/user-notification-settings-response.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from '../../../ui-api/notification.service';

@Component({
  selector: 'app-notifications-settings',
  templateUrl: './notifications-settings.component.html',
  styleUrls: ['./notifications-settings.component.scss']
})
export class NotificationsSettingsComponent extends DetailsFormBase<IUserNotificationSettingsResponseModel> implements OnInit {
  @ViewChild('formErrors') formErrors;
  userNotificationsSettingsForm: FormGroup;
  keysList = [];

  constructor(private formBuilder: FormBuilder, private userNotificationsApiService: UserNotificationsApiService,
              private router: Router, private config: ConfigService, private notificationService: NotificationService) {
    super();
  }

  save() {
    const value = this.userNotificationsSettingsForm.value as any;
    this.userNotificationsApiService.postAction(
      'set_user_notifications_settings', {notifications_settings: value}
      ).subscribe(response => {
        this.router.navigateByUrl(
          this.config.getPrevUrl('user/notifications')
        ).catch(() => {
        });
    }, error => {
        this.notificationService.showMessage('Failed to update notifications settings');
        this.formErrors.setBackendErrors(error.error);
    });
    return of(null);
  }

  ngOnInit(): void {
    super.ngOnInit();
    const controlsConfig = {};
    if (this.object) {
      for (const key in this.object.detail) {
        if (this.object.detail.hasOwnProperty(key)) {
          this.keysList.push(key);
          controlsConfig[key] = this.formBuilder.group({
            name: this.formBuilder.control(this.object.detail[key].name),
            display_name: this.formBuilder.control(this.object.detail[key].display_name),
            enabled: this.formBuilder.control(this.object.detail[key].enabled)
          });
        }
      }
    }
    this.userNotificationsSettingsForm = this.formBuilder.group(controlsConfig);
    if (this.objectController) {
      this.objectController.actionCallback = () => this.save();
    }
  }

}
