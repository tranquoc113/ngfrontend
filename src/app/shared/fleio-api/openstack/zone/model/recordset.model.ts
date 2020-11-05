import { FleioId, IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';

export interface IRecordsetModel extends IBaseFleioObjectModel {
  changed?: boolean;
  status?: string;
  records: string[];
  zone_id?: FleioId;
  ttl: number;
  zone_name?: string;
  project_id?: string;
  type: string;
  id?: string;
  name: string;
  deleted?: boolean;
  created?: boolean;
}
