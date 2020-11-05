import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { MenuModel } from '../../models/menu.model';
import { AuthService } from '../../../auth/auth.service';
import { MenuItemContainerModel } from '../../models/menu-item-container.model';
import { OrderingService } from '../../../ui-api/ordering.service';
import { DynamicUiApiService } from '../../../fleio-api/dynamic-ui/dynamic-ui-api.service';
import { MenuItemModel } from '../../models/menu-item.model';
import { FilteringService } from '../../../ui-api/filtering.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss']
})
export class SideNavMenuComponent implements OnInit {
  menu = {items: []} as MenuModel;

  constructor(
    private config: ConfigService,
    private router: Router,
    private authService: AuthService,
    private orderingService: OrderingService,
    private filteringService: FilteringService,
    private dynamicUiApiService: DynamicUiApiService,
  ) {
  }

  private canAddMenuItem(feature: string): boolean {
    return !!(this.authService.userData && this.authService.userData.features[feature]);
  }

  public canShowMenuItemContainer(menuItemContainer: MenuItemContainerModel) {
    let itemsNotShownCount = 0;
    for (const item of menuItemContainer.items) {
      if (typeof item === 'boolean' && item === false) {
        itemsNotShownCount += 1;
      }
    }
    return menuItemContainer.items.length !== itemsNotShownCount;
  }

  ngOnInit() {
    this.authService.loggedInCompleted.subscribe(isLoggedIn => {
      if (!this.menu.items || !this.menu.items.length) {
        // this also loads menu on page init even if user was logged in before
        this.loadMenu();
      }
    });
    this.orderingService.ordering$.subscribe(() => {
      if (this.menu && this.menu.items && this.menu.items.length) {
        this.refreshMenuItemsQueryParams();
      }
    });
    this.filteringService.filteringChange$.subscribe(() => {
      if (this.menu && this.menu.items && this.menu.items.length) {
        this.refreshMenuItemsQueryParams();
      }
    });
  }

  private refreshMenuItemsQueryParams() {
    for (let menuEntry of this.menu.items) {
      if (menuEntry.type === 'menuItem') {
        menuEntry = this.setMenuEntryParams(menuEntry);
      } else if (menuEntry.type === 'menuItemContainer') {
        for (let menuItemEntry of menuEntry.items) {
          menuItemEntry = this.setMenuEntryParams(menuItemEntry);
        }
      }
    }
  }

  private setMenuEntryParams(menuEntry: MenuItemModel): any {
    if (menuEntry.angularjs_path === null && menuEntry.angular_route !== null) {
      if (menuEntry.angular_route === '') {
        menuEntry.route = this.config.getPanelHomeUrl();
        menuEntry.queryParams = {};
      } else {
        menuEntry.route = this.config.getPanelUrl(menuEntry.angular_route);
        menuEntry.queryParams = this.orderingService.getQueryParams(menuEntry.angular_route);
        menuEntry.queryParams = this.filteringService.updateQueryParams(menuEntry.angular_route, menuEntry.queryParams);
      }
    }
    return menuEntry;
  }

  private loadMenu() {
    if (this.authService.userData && this.authService.userData.user) {
      this.dynamicUiApiService.getAction('get_app_menu').subscribe(response => {
        this.menu.items = response.menu;
        this.refreshMenuItemsQueryParams();
      });
    }
  }
}
