import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';
import { IProjectModel } from '@fleio-api/openstack/model/project.model';
import { IClientModel } from '@fleio-api/client-user/model/client.model';

export interface IClusterModel extends IBaseFleioObjectModel {
  name: string;
  updated_at: Date;
  created_at: Date;
  keypair: string;
  stack_id: string;
  master_flavor_id: string;
  flavor_id: string;
  health_status: string;
  status: string;
  status_reason: string;
  labels: string;
  api_address: string;
  discovery_url: string;
  node_addresses: string;
  master_addresses: string;
  cluster_template: IClusterTemplateModel;
  project: IProjectModel;
  region: string;
  master_count: number;
  node_count: number;
  create_timeout: number;
  sync_version: number;
  display_status: string;
  under_task: boolean;
  client: IClientModel;
}
