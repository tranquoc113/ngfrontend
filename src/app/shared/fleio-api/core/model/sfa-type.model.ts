import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface ISfaTypeModel extends IBaseFleioObjectModel{
  related_method: {
    default: boolean;
    enabled: boolean;
  };
  name: string;
  enabled_to_staff: boolean;
  enabled_to_enduser: boolean;
  display_name: string;
  help_text: string;
  route?: string;
}
