import { IObjectController } from './interfaces/object-controller';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { ISummaryCardData } from './interfaces/card-data/summary-card-data';
import { IDetailsData } from './interfaces/details/details-data';
import { IObjectUIService } from './interfaces/object-ui-service';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { IObjectListUIService } from './interfaces/object-list-ui-service';
import { CallbackAction } from './actions/callback-action';
import { IAction } from './interfaces/actions/action';
import { IActionResult } from './interfaces/actions/action-result';
import { IObjectData } from './interfaces/object-data';

export class ObjectController implements IObjectController {
  object: IBaseFleioObjectModel;
  objectActions: IAction[] = null;
  summaryCardData: ISummaryCardData = null;
  detailsCardData: IDetailsData = null;

  additionalObjects?: { [objectName: string]: IBaseFleioObjectModel };
  private permissions: IPermissionsModel;
  private dataSubscription: Subscription;

  public objectUIService: IObjectUIService;
  private readonly state: string;

  public currentTabIndex = new BehaviorSubject<number>(0);
  public currentTabIndex$ = this.currentTabIndex.asObservable();

  private dataChangedBS = new BehaviorSubject<IObjectController>(this);
  dataChanged$ = this.dataChangedBS.asObservable();

  actionCallback: (action: CallbackAction) => Observable<IActionResult> = null;

  constructor(
    objectData: Observable<IObjectData>,
    objectListUIService: IObjectListUIService, state: string,
  ) {
    this.state = state;
    this.dataSubscription = objectData.subscribe((data) => {
      if ((JSON.stringify(this.object) !== JSON.stringify(data.object)) ||
        (JSON.stringify(this.permissions) !== JSON.stringify(data.permissions)) ||
        (JSON.stringify(this.additionalObjects) !== JSON.stringify(data.additionalObjects))) {
        this.object = data.object;
        this.additionalObjects = data.additionalObjects;
        this.permissions = data.permissions;
        this.objectActions = null;
        this.summaryCardData = null;
        this.detailsCardData = null;
        this.objectUIService = objectListUIService.getObjectUIService(this.object, this.permissions, state);
        this.dataChangedBS.next(this);
      }
    });
  }

  unsubscribe() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
      this.dataSubscription = null;
    }
  }

  setActionCallback(actions: IAction[]): IAction[] {
    for (const action of actions) {
      if (action instanceof CallbackAction && !action.callback) {
        (action as CallbackAction).callback = (callbackAction) => {
          if (this.actionCallback) {
            return this.actionCallback(callbackAction);
          }

          return of(null);
        };
      }
    }

    return actions;
  }

  getObjectActions(): IAction[] {
    if (['card-view', 'list-view', 'details'].indexOf(this.state) === -1) {
      return [];
    }

    if (!this.objectActions) {
      this.objectActions = this.objectUIService.getActions()
    }
    return this.objectActions;
  }

  getSummaryCardData(): ISummaryCardData {
    if (!this.summaryCardData) {
      const detailsLink = this.objectUIService.getDetailsLink();

      this.summaryCardData = {
        header: {
          title: this.objectUIService.getTitle(this.additionalObjects),
          icon: this.objectUIService.getIcon(),
          status: this.objectUIService.getStatus(),
          tags: this.objectUIService.getCardTags(),
        },
        detailsLink: {
          enabled: !!detailsLink,
          url: detailsLink,
        },
        fields: this.objectUIService.getCardFields(),
        actions: this.setActionCallback(this.getObjectActions()),
      };
    }

    return this.summaryCardData;
  }

  getDetailsCardData(): IDetailsData {
    if (!this.detailsCardData) {
      this.detailsCardData = {
        header: {
          title: this.objectUIService.getTitle(this.additionalObjects),
          icon: this.objectUIService.getIcon(),
          status: this.objectUIService.getStatus(),
          tags: this.objectUIService.getCardTags(),
        },
        actions: this.setActionCallback(this.getObjectActions()),
        tabs: this.objectUIService.getTabs(this.additionalObjects),
        detailsActions: this.setActionCallback(this.objectUIService.getDetailsActions()),
      };

      if (this.objectUIService.getObjectDetailsRefreshInterval) {
        this.detailsCardData.refreshInterval = this.objectUIService.getObjectDetailsRefreshInterval();
      }
    }

    return this.detailsCardData
  }
}
