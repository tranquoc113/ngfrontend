import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { IDetailsData } from '../interfaces/details/details-data';
import { IObjectController } from '../interfaces/object-controller';
import { NotificationService } from '@shared/ui-api/notification.service';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { Subscription } from 'rxjs';
import { AuthService } from '@shared/auth/auth.service';
import { ConfigService } from '@shared/config/config.service';
import { ActionTypes } from '@objects-view/actions/action-types';

@Component({
  selector: 'app-object-details',
  templateUrl: './object-details.component.html',
  styleUrls: ['./object-details.component.scss']
})
export class ObjectDetailsComponent implements OnInit, OnDestroy {
  @Input() objectController: IObjectController;
  @Input() additionalClasses: string[];
  @Input() detailsData: IDetailsData;
  public actionTypes = ActionTypes;

  requestedTabIndex: number;
  selectedTabIndex: number;

  innerWidth: number;
  visibleActions = 4;

  classes: { [className: string]: boolean } = {};

  private dataChangedSubscription: Subscription = null;

  constructor(
    public notificationService: NotificationService, public refreshService: RefreshService, private auth: AuthService,
    private config: ConfigService,
  ) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.setVisibleActionsNumber();
    if (!this.detailsData) {
      if (this.objectController) {
        if (this.objectController.object) {
          if (this.objectController.dataChanged$) {
            this.dataChangedSubscription = this.objectController.dataChanged$.subscribe(objectController => {
              this.setDetailsData(objectController.getDetailsCardData());
            });
          } else {
            this.setDetailsData(this.objectController.getDetailsCardData());
          }
        } else {
          console.error('object not set in object details component');
        }
      } else {
        console.error('objectController not set in object details component');
      }
    }

    if (!this.detailsData) {
      console.error('detailsData not set in object details component');
    } else {
      if (this.detailsData.detailsActions && !this.detailsData.detailsActions.find(action => action.primary)) {
        // set last action as primary if no primary action found
        if (this.detailsData.detailsActions && this.detailsData.detailsActions.length) {
          this.detailsData.detailsActions[this.detailsData.detailsActions.length - 1].primary = true;
        }
      }
    }

    if (this.additionalClasses) {
      for (const className of this.additionalClasses) {
        this.classes[className] = true;
      }
    }

    const currentUrl = this.config.getCurrentUrl();
    if (currentUrl && currentUrl.includes('#')) {
      const parts = currentUrl.split('#')
      const tabName = decodeURI(parts[parts.length - 1]);
      this.requestedTabIndex = this.objectController.getDetailsCardData().tabs.findIndex(
        t => {
          return t.tabName.toLowerCase() === tabName.toLowerCase();
        },
      );
      if (this.requestedTabIndex >= 0) {
        this.selectedTabIndex = this.requestedTabIndex;
        this.changedTabIndex(this.selectedTabIndex);
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.setVisibleActionsNumber();
  }

  setVisibleActionsNumber() {
    if (this.innerWidth < 1280) {
      this.visibleActions = 0;
    } else {
      this.visibleActions = 4;
    }
  }

  arrayEquals(a1, a2) {
    return JSON.stringify(a1) === JSON.stringify(a2);
  }

  setDetailsData(detailsData: IDetailsData) {
    if (!this.detailsData) {
      this.detailsData = {...detailsData};
      this.detailsData.tabs = this.detailsData.tabs.filter(tab => {
        if (tab.featureName) {
          return this.auth.feature(tab.featureName);
        } else {
          return true;
        }
      });
      if (detailsData.refreshInterval) {
        this.detailsData.refreshInterval = detailsData.refreshInterval;
        this.refreshService.startRefreshTimer(this.detailsData.refreshInterval);
      }

      return;
    } else {
      if (detailsData.refreshInterval) {
        if (!this.detailsData || this.detailsData.refreshInterval !== detailsData.refreshInterval) {
          this.detailsData.refreshInterval = detailsData.refreshInterval;
          this.refreshService.startRefreshTimer(this.detailsData.refreshInterval);
        }
      } else {
        this.detailsData.refreshInterval = undefined;
        this.refreshService.stopRefreshTimer();
      }

      this.detailsData.header = detailsData.header;
      this.detailsData.actions = detailsData.actions;
      this.detailsData.detailsActions = detailsData.detailsActions;

      if (!this.arrayEquals(this.detailsData.tabs, detailsData.tabs)) {
        this.detailsData.tabs = detailsData.tabs;
      }
    }
  }

  get objectNotFound() {
    return this.objectController && !this.objectController.object;
  }

  changedTabIndex(newIndex: number) {
    this.objectController.currentTabIndex.next(newIndex);
  }

  ngOnDestroy(): void {
    if (this.dataChangedSubscription) {
      this.dataChangedSubscription.unsubscribe();
      this.dataChangedSubscription = null;
    }
  }
}
