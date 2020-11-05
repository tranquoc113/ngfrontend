import { IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';

export interface IZoneModel extends IBaseFleioObjectModel {
  attributes: any;
  created_at: Date;
  description: string;
  email: string;
  masters: any[];
  name: string;
  project_id: string;
  serial: number;
  status: string;
  ttl: number;
  type: string;
  updated_at: Date;
  version: number;
  client: any;
}
