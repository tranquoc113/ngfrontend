import { Component, OnInit } from '@angular/core';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { INotificationModel } from '../../../../shared/fleio-api/notifications/model/notification.model';
import { NotificationsListUiService } from '../notifications-list-ui.service';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';


@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent extends ListBase<INotificationModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private notificationsListUiService: NotificationsListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, notificationsListUiService, refreshService, 'notifications');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
