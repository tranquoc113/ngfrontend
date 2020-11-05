import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IGatewayModel extends IBaseFleioObjectModel {
  name: string;
  display_name: string;
  enabled: boolean;
  recurring_payments_enabled: boolean;
  visible_to_user: boolean;
  instructions: string;
  fixed_fee: string;
  percent_fee: string;
  module_settings: {
    capabilities: {
      can_process_payments: boolean;
      returns_fee_information: boolean;
      supports_recurring_payments?: boolean;
    }
  };
}
