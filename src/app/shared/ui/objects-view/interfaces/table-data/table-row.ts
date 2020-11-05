import { ITableCell } from './table-cell';
import { IObjectStatus } from '../object-status';
import { IIcon } from '../../../common/interfaces/icon';
import {IAction} from '../actions/action';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';

export interface ITableRow {
  object?: IBaseFleioObjectModel;
  expandable?: boolean;
  cells: {[column: string]: ITableCell};
  status?: IObjectStatus;
  icon?: IIcon;
  actions?: IAction[];
  url?: string;
  boldText?: boolean;
  detailComponentData?: {};
}
