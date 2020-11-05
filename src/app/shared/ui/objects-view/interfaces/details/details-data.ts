import { IAction } from '../actions/action';
import { ICardHeader } from '../card-data/card-header';
import { IDetailsTab } from './details-tab';

export interface IDetailsData {
  header?: ICardHeader;
  actions?: IAction[];
  tabs?: IDetailsTab[];
  detailsActions?: IAction[];
  refreshInterval?: number;
}
