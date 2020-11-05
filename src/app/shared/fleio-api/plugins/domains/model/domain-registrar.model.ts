import { FleioId, IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';

export interface IDomainRegistrarModel extends IBaseFleioObjectModel {
  registrar_connector_display: string;
  display_name: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  connector: FleioId | any;
}
