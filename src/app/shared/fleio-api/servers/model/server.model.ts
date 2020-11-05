import { FleioId, IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IServerGroupModel } from './server-group.model';
import { IServerPluginModel } from './server-plugin.model';
import { IHostingServerSettingsModel } from './hosting-server-settings.model';

export interface IServerModel extends IBaseFleioObjectModel {
  settings: {};
  name: string;
  status: string;
  created_at: Date;
  group: IServerGroupModel | FleioId;
  plugin: IServerPluginModel | FleioId;

  hosting_server_settings?: IHostingServerSettingsModel;
  has_settings_component?: boolean;
  available_groups?: IServerGroupModel[];
  availableStatuses?: string[][];
  available_plugins?: IServerPluginModel[];
  plugin_details: IServerPluginModel;
}
