import { IBaseFleioObjectModel } from '../../../fleio-api/base-model/base-fleio-object.model';
import { IObjectController } from './object-controller';
import { ITableData } from './table-data/table-data';
import { Observable } from 'rxjs';
import { FleioObjectsList } from '../../../fleio-api/fleio-objects-list';
import { IAction } from './actions/action';
import { IObjectListUIService } from './object-list-ui-service';
import { ICardViewData } from './card-data/card-view-data';

export interface IObjectListController {
  objects: IBaseFleioObjectModel[];
  objectList: FleioObjectsList<IBaseFleioObjectModel>;
  objectListUIService: IObjectListUIService;
  cardViewData$: Observable<ICardViewData>;
  tableData$: Observable<ITableData>;

  controller(object: IBaseFleioObjectModel, state?: string): IObjectController;
  actions(): IAction[];
}
