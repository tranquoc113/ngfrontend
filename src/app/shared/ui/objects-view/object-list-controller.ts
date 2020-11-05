import { IObjectListController } from './interfaces/object-list-controller';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IObjectController } from './interfaces/object-controller';
import { ObjectController } from './object-controller';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IObjectListUIService } from './interfaces/object-list-ui-service';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ITableData } from './interfaces/table-data/table-data';
import { IAction } from './interfaces/actions/action';
import { ISummaryCardData } from './interfaces/card-data/summary-card-data';
import { ICardViewData } from './interfaces/card-data/card-view-data';
import { IObjectData } from './interfaces/object-data';

export class ObjectListController<ObjectControllerType extends ObjectController> implements IObjectListController {
  private permissions: IPermissionsModel;

  private readonly objectListSubscription: Subscription;
  private readonly tableDataBS: BehaviorSubject<ITableData> = new BehaviorSubject<ITableData>(null);
  private readonly cardViewDataBS:
    BehaviorSubject<ICardViewData> = new BehaviorSubject<ICardViewData>({cards: []});

  private objectControllers: {
    [key: string]: {
      controller: ObjectController;
      objectDataBS: BehaviorSubject<IObjectData>;
    }
  } = {};

  objectList: FleioObjectsList<IBaseFleioObjectModel>;
  cardViewData$ = this.cardViewDataBS.asObservable();
  tableData$ = this.tableDataBS.asObservable();

  cardViewData: ICardViewData = null;

  constructor(
    objectsList$: Observable<FleioObjectsList<IBaseFleioObjectModel>>,
    public objectListUIService: IObjectListUIService,
  ) {
    this.objectListSubscription = objectsList$.subscribe(objectsList => {
      if (objectsList) {
        if ((JSON.stringify(this.objectList) !== JSON.stringify(objectsList)) ||
          (JSON.stringify(this.permissions) !== JSON.stringify(objectsList.permissions))) {
          this.objectList = objectsList;
          this.permissions = objectsList.permissions;
          this.cardViewData = null;
          this.tableDataBS.next(this.objectListUIService.getTableData(objectsList));
          this.cardViewDataBS.next(this.getCardViewData());
        }
      }
    });
  }

  protected getCardViewData(): ICardViewData {
    if (!this.cardViewData) {
      const cards: ISummaryCardData[] = [];

      for (const object of this.objects) {
        const cardData = this.controller(object, 'card-view').getSummaryCardData();
        cardData.object = object;
        cards.push(cardData);
      }

      return {
        cards,
        trackByFunction: (index, item: ISummaryCardData) => item.object.id,
      };
    }

    return this.cardViewData;
  }

  public unsubscribe() {
    this.objectListSubscription.unsubscribe();
  }

  get objects(): IBaseFleioObjectModel[] {
    if (this.objectList) {
      return this.objectList.objects;
    } else {
      return [];
    }
  }

  controller(object: IBaseFleioObjectModel, state?: string): IObjectController {
    const key = state + object.id;
    if (!this.objectControllers[key]) {
      const objectDataBS = new BehaviorSubject<IObjectData>(
        {object, permissions: this.permissions},
      );
      this.objectControllers[key] = {
        objectDataBS,
        controller: new ObjectController(
          objectDataBS.asObservable(), this.objectListUIService, state
        ),
      };
    } else {
      this.objectControllers[key].objectDataBS.next({object, permissions: this.permissions});
    }

    return this.objectControllers[key].controller;
  }

  actions(): IAction[] {
    return this.objectListUIService.getActions(this.objectList);
  }
}
