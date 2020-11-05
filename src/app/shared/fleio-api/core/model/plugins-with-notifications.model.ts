import { IPluginNotificationCountModel } from './plugin-notification-count.model';

export interface IPluginsWithNotificationsModel {
  total_notification_count: number;
  plugins: IPluginNotificationCountModel[];
}
