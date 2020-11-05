import { IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';

export interface INameserverModel extends IBaseFleioObjectModel {
  host_name: string;
  ipv4: string;
  ipv6: string;
  created_at: Date;
  updated_at: Date;
}
