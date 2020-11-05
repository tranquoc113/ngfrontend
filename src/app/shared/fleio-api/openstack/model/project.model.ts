import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IProjectModel extends IBaseFleioObjectModel {
  created_at: Date;
  deleted: boolean;
  description: string;
  extras: any;
  fleio_disable_reason: string;
  is_domain: boolean;
  name: string;
  project_domain_id: string;
  project_id: string;
  service: number;
  updated_at: Date;
  disabled: boolean;
}
