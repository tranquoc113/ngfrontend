import { FleioId, IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';

export interface ISubnetPoolModel extends IBaseFleioObjectModel {
  prefixes: string[];
  project_name: string;
  name: string;
  description: string;
  project_id: FleioId;
  region: string;
  ip_version: number;
  default_prefixlen: number;
  min_prefixlen: number;
  max_prefixlen: number;
  shared: boolean;
  default_quota: number;
  address_scope_id: FleioId;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
}
