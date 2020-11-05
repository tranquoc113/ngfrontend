import { Component, Input, OnInit } from '@angular/core';
import { MenuItemContainerModel } from '../../models/menu-item-container.model';
import { MenuService } from '../menu.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { RouteHelper } from '../../../ui-api/route-helper';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-menu-item-container',
  templateUrl: './menu-item-container.component.html',
  styleUrls: ['./menu-item-container.component.scss'],
  animations: [
    trigger('openCloseDropdown', [
      state('open', style({
        transform: 'rotate(90deg)',
      })),
      transition('open => closed', [
        animate('0.2s ease-in-out')
      ]),
      transition('closed => open', [
        animate('0.2s ease-in-out')
      ]),
    ]),
    trigger('openCloseItems', [
      state('closed', style({
        height: '0',
      })),
      state('open', style({
        height: '*',
      })),
      transition('open => closed', [
        animate('230ms')
      ]),
      transition('closed => open', [
        animate('230ms')
      ]),
    ]),
  ]
})
export class MenuItemContainerComponent implements OnInit {
  @Input() menuItemContainer: MenuItemContainerModel;
  expanded = false;
  showContainer = false;

  constructor(private menuService: MenuService, private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  toggle() {
    if (this.menuService.expandedMenuItemContainer === this.menuItemContainer.category) {
      return this.menuService.expandedMenuItemContainer = null;
    }
    this.expand();
  }

  expand() {
    this.menuService.expandedMenuItemContainer = this.menuItemContainer.category;
  }

  getExpanded(): boolean {
    return this.menuService.expandedMenuItemContainer === this.menuItemContainer.category;
  }

  ngOnInit() {
    const routePath = '/' + new RouteHelper(this.activatedRoute).getRoutePath();
    if (this.menuItemContainer) {
      if (!this.menuItemContainer.main_feature || (this.menuItemContainer.main_feature &&
        this.authService.feature(this.menuItemContainer.main_feature))) {
        // determine if we can show container only if main feature is active or is undefined
        for (const menuItem of this.menuItemContainer.items) {
          if (!this.showContainer) {
            if (this.authService.feature(menuItem.feature)) {
              // found at least one item with active feature, we can show container
              this.showContainer = true;
            }
          }
        }
      }
      for (const menuItem of this.menuItemContainer.items) {
        if (routePath.includes(menuItem.route)) {
          this.expand();
        }
      }
    }
  }

}
