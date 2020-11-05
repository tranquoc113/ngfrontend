import { ITitle } from './card-data/card-title';
import { IIcon } from '../../common/interfaces/icon';
import { IObjectStatus } from './object-status';
import { IAction } from './actions/action';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IDataField } from './card-data/data-field';
import { IDetailsTab } from './details/details-tab';

export interface IObjectUIService {
  object: IBaseFleioObjectModel;

  setData(object: IBaseFleioObjectModel, permissions: IPermissionsModel);
  getTitle(additionalObjects?: {[name: string]: object}): ITitle;
  getIcon(): IIcon;
  getStatus(): IObjectStatus;
  getActions(): IAction[];
  getDetailsLink(): string;
  getCardFields(): IDataField[];
  getCardTags(): string[];
  getTabs(additionalObjects?: {[name: string]: object}): IDetailsTab[];
  getDetailsActions(): IAction[];
  getObjectDetailsRefreshInterval?(): number;
}
