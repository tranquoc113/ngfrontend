import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IPluginModel extends IBaseFleioObjectModel {
  display_name: string;
  app_name: string;
  app_label: string;
  feature_name: string;
  staff_feature_name: string;
  app_loaded: boolean;
  enabled: boolean;
}
