import { FleioId, IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IOrderItemModel extends IBaseFleioObjectModel {
  id: number;
  name: string;
  description: string;
  cycle_display: string;
  service: FleioId;
  link_params: string;
}
