import { FleioId, IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';
import { ICustomFieldDefinitionModel } from '../../../custom-fields/model/custom-field-definition.model';

export interface ITLDModel extends IBaseFleioObjectModel {
  name: string;
  whois_server_configured: boolean;
  custom_fields: {[fieldName: string]: ICustomFieldDefinitionModel};
  created_at: Date;
  updated_at: Date;
  premium_domains_available: boolean;
  edit_options: string;
  requires_epp_for_transfer: boolean;
  register_product: FleioId;
  transfer_product: FleioId;
  renew_product: FleioId;
  dns_options: FleioId;
  email_options: FleioId;
  id_options: FleioId;
  default_registrar: FleioId | any;
  registrars: FleioId[];
}
