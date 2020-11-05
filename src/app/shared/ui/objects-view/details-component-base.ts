import { IObjectController } from './interfaces/object-controller';
import { ChangeDetectorRef, Directive, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { DEFAULT_BOOST_INTERVALS, RefreshTimer } from '../../ui-api/helpers/refresh-timer';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IAction } from '@objects-view/interfaces/actions/action';

@Directive()
export class DetailsComponentBase<ObjectType extends IBaseFleioObjectModel>
  implements OnInit, OnDestroy {
  @Input() objectController: IObjectController;
  @Input() componentTabIndex: number;
  @Input() data?: {};
  @Input() detailsActions?: Array<IAction>;
  public primaryAction: IAction = null;

  protected tabActive = false;
  protected refreshTimer: RefreshTimer;
  private tabEventsInitialized = false;

  private currentTabIndexSubscription: Subscription;

  constructor(private ngZone?: NgZone, protected changeDetectorRef?: ChangeDetectorRef,) {
  }

  ngOnInit() {
    this.initTabEvents();
    this.primaryAction = this.getPrimaryAction();
  }

  ngOnDestroy(): void {
    if (this.refreshTimer) {
      this.refreshTimer.stop();
      delete this.refreshTimer;
    }

    if (this.currentTabIndexSubscription) {
      this.currentTabIndexSubscription.unsubscribe();
      this.currentTabIndexSubscription = null;
    }
  }

  public get object(): ObjectType {
    if (this.objectController) {
      return this.objectController.object as ObjectType;
    } else {
      if (environment.enableErrorLogging) {
        console.error(`objectController was not set for ${this.constructor.name}`);
      }
    }
  }

  public getPrimaryAction() {
    let firstAction = null;
    if (this.detailsActions && Array.isArray(this.detailsActions)) {
      firstAction = this.detailsActions[0];
      for (const action of this.detailsActions) {
        if (action.primary) {
          return action;
        }
      }
    }
    return firstAction;
  }

  protected initTabEvents() {
    if (this.tabEventsInitialized === true) {
      console.error('Tab events are already initialized!');
      return;
    }
    if (!this.objectController) {
      if (environment.enableErrorLogging) {
        console.error('Cannot subscribe to tab changing events because no objectController was found!');
      }
      return;
    }
    this.currentTabIndexSubscription = this.objectController.currentTabIndex$.subscribe(tabIndex => {
      if (tabIndex === this.componentTabIndex) {
        if (!this.tabActive) {
          this.tabActive = true;
          this.tabActivated();
        }
      } else {
        if (this.tabActive) {
          this.tabActive = false;
          this.tabDeactivated();
        }
      }
      this.tabEventsInitialized = true;
    });
  }

  protected setupRefreshTimer(interval: number) {
    this.refreshTimer = new RefreshTimer(interval, () => {
      this.refreshData();
    }, null, this.ngZone, this.changeDetectorRef, this.tabActive);
    // TODO: pass configService on these details views to make use of the idleTimeout setting
  }

  protected boostRefreshTimer(boostIntervals: number[] = DEFAULT_BOOST_INTERVALS) {
    if (!this.refreshTimer) {
      console.error('refresh timer is not initialized');
      return;
    }

    this.refreshTimer.boost(boostIntervals);
  }

  protected initTabData() {
    // method used for initializing different data, e.g. changing actionCallback when changing tabs
  }

  protected tabActivated() {
    this.initTabData();
    if (this.refreshTimer) {
      this.refreshData();
      this.refreshTimer.start();
    }
  }

  protected tabDeactivated() {
    if (this.refreshTimer) {
      this.refreshTimer.stop();
    }
  }

  protected refreshData() {
  }
}
