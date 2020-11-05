import { IPluginModel } from './plugin.model';

export interface IPluginNotificationCountModel {
  plugin: IPluginModel;
  notification_count: number;
}
