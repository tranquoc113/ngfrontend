import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IClientModel } from '../../client-user/model/client.model';

export interface IVolumeModel extends IBaseFleioObjectModel {
  client: IClientModel;
  display_name: string;
  size_increment: number;
  minimum_size: number;
  number_of_snapshots: number;
  related_instance_uuid: string;
  region: string;
  user_id: string;
  name: string;
  description: string;
  status: string;
  size: number;
  type: string;
  consistencygroup_id: string;
  source_volid: string;
  snapshot_id: string;
  bootable: boolean;
  multiattach: boolean;
  availability_zone: string;
  migration_status: string;
  replication_status: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  project: object;
}
