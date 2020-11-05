import { IDataField } from './data-field';
import { IAction } from '../actions/action';
import { IDetailsLink } from '../details-link';
import { ICardHeader } from './card-header';
import { IBaseFleioObjectModel } from '../../../../fleio-api/base-model/base-fleio-object.model';

export interface ISummaryCardData {
  object?: IBaseFleioObjectModel;
  header: ICardHeader;
  detailsLink: IDetailsLink;
  componentName?: string;
  fields?: IDataField[];
  actions?: IAction[];
}
