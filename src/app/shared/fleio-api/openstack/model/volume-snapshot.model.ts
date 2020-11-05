import { FleioId, IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';
import { IClientModel } from '@fleio-api/client-user/model/client.model';

//
export interface IVolumeSnapshotModel extends IBaseFleioObjectModel {
  related_volume_name: string;
  client: IClientModel;
  name: string;
  status: string;
  progress: any;
  description: string;
  created_at: Date;
  updated_at: Date;
  size: number;
  metadata: string;
  volume: FleioId;
  region: string;
}
