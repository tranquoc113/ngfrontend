import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../shared/auth/auth.guard';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { IRouteConfig } from '../../../shared/ui-api/interfaces/route-config/route-config';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { UserNotificationsListResolver } from '../../../shared/fleio-api/notifications/user-notifications-list-resolver';
import { NotificationDetailsComponent } from './notification-details/notification-details.component';
import { UserNotificationResolver } from '../../../shared/fleio-api/notifications/user-notification.resolver';
import { UserNotificationsSettingsResolver } from '../../../shared/fleio-api/notifications/user-notifications-settings.resolver';
import { UserNotificationsSettingsComponent } from './user-notifications-settings/user-notifications-settings.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationListComponent,
    resolve: {
      notifications: UserNotificationsListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'core',
        search: {
          show: false,
          placeholder: 'Search notifications ...',
        },
        defaultDisplayList: true,
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.configurations;
          },
          objectName: 'notification',
          objectNamePlural: 'notifications',
        },
        ordering: {
          default: {
            display: 'Generated at',
            field: 'generated',
            direction: OrderingDirection.Ascending,
          },
          options: [
            {
              display: 'Generated at',
              field: 'generated',
            }
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'settings',
    component: UserNotificationsSettingsComponent,
    resolve: {
      userNotificationsSettings: UserNotificationsSettingsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return 'Notifications settings';
        },
      } as IRouteConfig,
    }
  },
  {
    path: ':id',
    component: NotificationDetailsComponent,
    resolve: {
      notification: UserNotificationResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.notification.title;
        },
      } as IRouteConfig,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsRoutingModule { }
