import { IBaseFleioObjectModel } from '../../../fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../../fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from './object-ui-service';
import { ITableData } from './table-data/table-data';
import { FleioObjectsList } from '../../../fleio-api/fleio-objects-list';
import { IAction } from './actions/action';

export interface IObjectListUIService {
  noItemsMessage?: string;

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService;

  getTableData(objectList: FleioObjectsList<IBaseFleioObjectModel>): ITableData;

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[];

  getRefreshInterval(): number;
}
