import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { GridsterComponent, GridsterConfig, GridsterItem } from 'angular-gridster2';
import { AppLocalStorageService } from '@shared/ui-api/app-local-storage.service';
import { AuthService } from '@shared/auth/auth.service';

@Component({
  selector: 'app-dashboard-base',
  templateUrl: './dashboard-base.component.html',
  styleUrls: ['./dashboard-base.component.scss']
})
export class DashboardBaseComponent implements OnInit {
  @ViewChild('gridsterComponent') gridsterComponent: GridsterComponent;
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  reloadDict = {};
  removedItems: Array<GridsterItem> = [];
  @Input() widgetComponentByTitle: {};
  @Input() widgetConfigByTitle: {};

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private appLocalStorageService: AppLocalStorageService,
    private authService: AuthService,
  ) {
  }

  removeItem(event, item) {
    const removed = this.dashboard[this.dashboard.indexOf(item)];
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
    this.removedItems.push(removed);
    this.appLocalStorageService.setDashboardData(this.dashboard , this.removedItems);
  }

  addItem(removedItemIndex: number) {
    const removed = this.removedItems[removedItemIndex];
    this.removedItems.splice(removedItemIndex, 1);
    this.dashboard.push(removed);
    this.appLocalStorageService.setDashboardData(this.dashboard , this.removedItems);
  }

  getHeight() {
    let height = '500px';
    if (this.gridsterComponent && this.gridsterComponent.rows) {
      if (this.gridsterComponent.rows > 1) {
        const heightNr = 20 * this.gridsterComponent.rows;
        height = `${heightNr}px`;
      }
    }
    return height;
  }

  reloadWidgetPanelComponent(item): void{
    this.reloadDict[item.title] = true;
    this.changeDetectorRef.detectChanges();
    this.reloadDict[item.title] = false;
    this.changeDetectorRef.detectChanges();
  }

  addInitialPanels(item: GridsterItem) {
    if (!this.dashboard) {
      this.dashboard = [];
    }
    this.dashboard.push(item);
  }

  initDashboard() {
    for (const widgetTitle in this.widgetConfigByTitle) {
      if (this.widgetConfigByTitle.hasOwnProperty(widgetTitle)) {
        if (this.authService.feature(this.widgetConfigByTitle[widgetTitle].feature)) {
          this.addInitialPanels(this.widgetConfigByTitle[widgetTitle]);
        }
      }
    }
  }

  ngOnInit() {
    this.options = {
      gridType: 'fit',
      itemChangeCallback: () => {
        this.appLocalStorageService.setDashboardData(this.dashboard , this.removedItems);
      },
      itemResizeCallback: () => {
      },
      minCols: 99,
      columns: 99,
      maxRows: 65,
      displayGrid: 'onDrag&Resize',
      pushItems: true,
      draggable: {
        enabled: true,
      },
      mobileBreakpoint: 968,
     };
    const savedDashboard = this.appLocalStorageService.getDashboardShownData();
    if (!savedDashboard) {
      this.initDashboard();
    } else {
      const savedDashboardFinal = [];
      for (const dashboardItem of savedDashboard) {
        dashboardItem.component = this.widgetComponentByTitle[dashboardItem.title];
        if (this.authService.feature(dashboardItem.feature)) {
          savedDashboardFinal.push(dashboardItem);
        }
      }
      this.dashboard = savedDashboardFinal;
    }
    const hiddenDashboardItems = this.appLocalStorageService.getDashboardHiddenData();
    if (hiddenDashboardItems) {
      const hiddenDashboardFinal = [];
      for (const dashboardItem of hiddenDashboardItems) {
        dashboardItem.component = this.widgetComponentByTitle[dashboardItem.title];
        if (this.authService.feature(dashboardItem.feature)) {
          hiddenDashboardFinal.push(dashboardItem);
        }
      }
      this.removedItems = hiddenDashboardFinal;
    }
    for (const widgetTitle in this.widgetConfigByTitle) {
      if (this.widgetConfigByTitle.hasOwnProperty(widgetTitle)) {
        if (this.authService.feature(this.widgetConfigByTitle[widgetTitle].feature)) {
          if (this.notInCurrentDashboard(widgetTitle) && this.notInHiddenDashboard(widgetTitle)) {
            this.removedItems.push(this.widgetConfigByTitle[widgetTitle]);
          }
        }
      }
    }
  }

  notInCurrentDashboard(widgetTitle: string) {
    let result = true;
    for (const item of this.dashboard) {
      if (item.title === widgetTitle) {
        result = false;
        break;
      }
    }
    return result;
  }

  notInHiddenDashboard(widgetTitle: string) {
    let result = true;
    for (const item of this.removedItems) {
      if (item.title === widgetTitle) {
        result = false;
        break;
      }
    }
    return result;
  }

}
