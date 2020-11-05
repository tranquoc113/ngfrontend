import { IBaseFleioObjectModel } from '../../../base-model/base-fleio-object.model';
import { IRecordsetModel } from '@fleio-api/openstack/zone/model/recordset.model';

export interface IRecordListModel extends IBaseFleioObjectModel {
  recordsets: IRecordsetModel[];
  read_only_recordsets: IRecordsetModel[];
  record_types: string[];
  detail?: string;
}
