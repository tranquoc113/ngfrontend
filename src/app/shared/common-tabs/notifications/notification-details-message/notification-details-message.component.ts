import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '../../../ui/objects-view/details-form-base';
import { INotificationModel } from '../../../fleio-api/notifications/model/notification.model';
import { of } from 'rxjs';
import { UserNotificationsApiService } from '../../../fleio-api/notifications/user-notifications-api.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../config/config.service';

@Component({
  selector: 'app-notification-details-message',
  templateUrl: './notification-details-message.component.html',
  styleUrls: ['./notification-details-message.component.scss']
})
export class NotificationDetailsMessageComponent extends DetailsFormBase<INotificationModel> implements OnInit {

  constructor(private userNotificationsApiService: UserNotificationsApiService, private router: Router,
              private config: ConfigService) {
    super();
  }

  switchReadStatus() {
    let action;
    if (this.object.status === 'pending') {
      action = 'view';
    } else {
      action = 'unseen';
    }
    this.userNotificationsApiService.objectPostAction(this.object.id, action, {})
      .subscribe(response => {
        this.router.navigateByUrl(
          this.config.getPrevUrl('user/notifications')
        ).catch(() => {
        });
      });
    return of(null);
  }

  ngOnInit(): void {
    if (this.objectController) {
      this.objectController.actionCallback = () => this.switchReadStatus();
    }
  }

}
