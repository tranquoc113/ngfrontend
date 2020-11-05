import { Component } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { INotificationModel } from '../../../../shared/fleio-api/notifications/model/notification.model';
import { NotificationsListUiService } from '../notifications-list-ui.service';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.scss']
})
export class NotificationDetailsComponent extends DetailsBase<INotificationModel> {
  constructor(route: ActivatedRoute, notificationsListUiService: NotificationsListUiService) {
    super(
      route, notificationsListUiService, 'details', 'notification',
    );
  }
}
