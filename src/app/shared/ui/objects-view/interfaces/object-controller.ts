import { IBaseFleioObjectModel } from '../../../fleio-api/base-model/base-fleio-object.model';
import { ISummaryCardData } from './card-data/summary-card-data';
import { IDetailsData } from './details/details-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { IActionResult } from './actions/action-result';

export interface IObjectController {
  object: IBaseFleioObjectModel;
  additionalObjects?: {[objectName: string]: any};
  actionCallback: (CallbackAction) => Observable<IActionResult>;
  currentTabIndex$: Observable<number>;
  currentTabIndex: BehaviorSubject<number>;
  dataChanged$: Observable<IObjectController>;

  getSummaryCardData?(): ISummaryCardData;
  getDetailsCardData(): IDetailsData;
}
