import { ITitle } from './card-title';
import { IIcon } from '../../../common/interfaces/icon';
import { IObjectStatus } from '../object-status';

export interface ICardHeader {
  title: ITitle;
  icon?: IIcon;
  status?: IObjectStatus;
  tags?: string[];
}
