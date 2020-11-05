import { Router } from '@angular/router';
import { ObjectUIServiceBase } from '../../../shared/ui/objects-view/object-ui-service-base';
import { ConfigService } from '../../../shared/config/config.service';
import { INotificationModel } from '../../../shared/fleio-api/notifications/model/notification.model';
import { DatePipe } from '@angular/common';
import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { UserNotificationsApiService } from '../../../shared/fleio-api/notifications/user-notifications-api.service';
import { IIcon } from '../../../shared/ui/common/interfaces/icon';
import { IObjectStatus, StatusType, StatusValue } from '../../../shared/ui/objects-view/interfaces/object-status';
import { ITitle } from '../../../shared/ui/objects-view/interfaces/card-data/card-title';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { RouterLinkAction } from '../../../shared/ui/objects-view/actions/router-link-action';
import { CallbackAction } from '../../../shared/ui/objects-view/actions/callback-action';
import { IDataField } from '../../../shared/ui/objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '../../../shared/ui/objects-view/interfaces/details/details-tab';
import { NotificationDetailsMessageComponent } from '../../../shared/common-tabs/notifications/notification-details-message/notification-details-message.component';
import { NotificationsSettingsComponent } from '../../../shared/common-tabs/notifications/notifications-settings/notifications-settings.component';


export class NotificationsUiService extends ObjectUIServiceBase<INotificationModel> {
  private statusMap: Map<string, IObjectStatus> = new Map<string, IObjectStatus>([
    ['pending', { type: StatusType.Defined, value: StatusValue.Warning }],
    ['seen', { type: StatusType.Defined, value: StatusValue.Cancelled }],
  ]);
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly userNotificationsApiService: UserNotificationsApiService;
  private readonly datePipe: DatePipe;


  constructor(
    notifications: INotificationModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, userNotificationsApiService: UserNotificationsApiService
  ) {
    super(notifications, permissions, state);
    this.router = router;
    this.config = config;
    this.userNotificationsApiService = userNotificationsApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    if (this.object.status) {
      switch (this.object.status) {
        case 'pending':
          return  {type: StatusType.Defined, value: StatusValue.Warning};
        case 'seen':
          return  {type: StatusType.Defined, value: StatusValue.Cancelled};
        default:
          return {type: StatusType.Defined, value: StatusValue.Cancelled};
      }
    }

    let status: IObjectStatus = { type: StatusType.None, value: StatusValue.None };
    if (this.statusMap.has(this.object.status)) {
      status = this.statusMap.get(this.object.status);
    }
    return status;
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'settings':
        return {
          text: `Notifications settings`,
        };

      default:
        return {
          text: `${this.object.title}`,
          subText: `${this.datePipe.transform(this.object.generated)}`,
        };
    }
  }

  getActions(): IAction[] {
    return [];
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`user/notifications/${this.object.id}`);
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'details':
        actions.push(new RouterLinkAction({
            name: 'Back',
            routerUrl: this.config.getPrevUrl(`user/notifications`),
            router: this.router,
          }
        ));
        if (this.object.status === 'pending') {
          actions.push(new CallbackAction({name: 'Mark as read'}));
        } else if (this.object.status === 'seen') {
          actions.push(new CallbackAction({name: 'Mark as unread'}));
        }
        break;
      case 'settings':
        actions.push(new RouterLinkAction({
            name: 'Back',
            routerUrl: this.config.getPrevUrl(`user/notifications`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Save'}));
        break;
      default:
        break;
    }

    return actions;
  }

  getCardFields(): IDataField[] {
    return [
      {
        name: 'Status',
        value: this.object.status
      }
    ];
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Details',
            component: NotificationDetailsMessageComponent,
          }
        ];
      case 'settings':
        return [
          {
            tabName: 'Settings',
            component: NotificationsSettingsComponent,
          }
        ]
    }
  }

  getCardTags(): string[] {
    return [];
  }
}
