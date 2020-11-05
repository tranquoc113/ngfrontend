import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { NotificationDetailsComponent } from './notification-details/notification-details.component';
import { UserNotificationsSettingsComponent } from './user-notifications-settings/user-notifications-settings.component';



@NgModule({
  declarations: [
    NotificationListComponent,
    NotificationDetailsComponent,
    UserNotificationsSettingsComponent,
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    ObjectsViewModule
  ]
})
export class NotificationsModule { }
