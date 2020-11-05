import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';

export interface IOpenstackBackupSchedule extends IBaseFleioObjectModel {
  instance: string;
  backup_name: string;
  backup_type: string;
  rotation: number;
  hour: number;
  day: number;
  run_at: Date;
}
