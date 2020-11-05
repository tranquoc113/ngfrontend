import { Component } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { NotificationsListUiService } from '../notifications-list-ui.service';
import { IUserNotificationSettingsResponseModel } from '../../../../shared/fleio-api/notifications/model/user-notification-settings-response.model';

@Component({
  selector: 'app-user-notifications-settings',
  templateUrl: './user-notifications-settings.component.html',
  styleUrls: ['./user-notifications-settings.component.scss']
})
export class UserNotificationsSettingsComponent extends DetailsBase<IUserNotificationSettingsResponseModel> {
  constructor(route: ActivatedRoute, notificationsListUiService: NotificationsListUiService) {
    super(
      route, notificationsListUiService, 'settings', 'userNotificationsSettings',
    );
  }
}
