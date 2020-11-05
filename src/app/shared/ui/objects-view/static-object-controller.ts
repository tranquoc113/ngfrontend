import { IObjectController } from './interfaces/object-controller';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IDetailsData } from './interfaces/details/details-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { CallbackAction } from './actions/callback-action';
import { IActionResult } from './interfaces/actions/action-result';
import { ISummaryCardData } from './interfaces/card-data/summary-card-data';

export class StaticObjectController implements IObjectController {
  object: IBaseFleioObjectModel;
  additionalObjects: { [objectName: string]: any };
  public currentTabIndex = new BehaviorSubject<number>(0);
  public currentTabIndex$ = this.currentTabIndex.asObservable();

  dataChanged$ = null;
  actionCallback: (action: CallbackAction) => Observable<IActionResult> = null;
  detailsData: IDetailsData

  constructor(
    detailsData: IDetailsData,
    object?: IBaseFleioObjectModel,
    additionalObjects?: { [objectName: string]: any },
  ) {
    this.detailsData = detailsData;
    this.object = object ? object : {};
    this.additionalObjects = additionalObjects;
  }

  getDetailsCardData(): IDetailsData {
    return this.detailsData;
  }

  getSummaryCardData(): ISummaryCardData {
    return null;
  }

}
