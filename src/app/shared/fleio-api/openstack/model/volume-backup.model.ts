import { FleioId, IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IClientModel } from '@fleio-api/client-user/model/client.model';

export interface IVolumeBackupModel extends IBaseFleioObjectModel {
  related_volume_name: string;
  client: IClientModel;
  name: string;
  description: string;
  status: string;
  object_count: number;
  created_at: Date;
  updated_at: Date;
  had_dependent_backups: boolean;
  size: number;
  is_incremental: boolean;
  snapshot_id: FleioId;
  sync_version: number;
  project: FleioId;
  volume: FleioId;
  region: string;
  has_dependent_backups?: boolean;
}
