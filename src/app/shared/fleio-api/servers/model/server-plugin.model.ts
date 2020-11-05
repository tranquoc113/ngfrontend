import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IServerPluginModel extends IBaseFleioObjectModel {
  label: string;
  display_name: string;
  has_settings_component: boolean;
  has_server_settings: boolean;
  server_settings: {[setting:string]:{required?: boolean; default: any;}};
}
