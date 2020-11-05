import {MenuItemModel} from './menu-item.model';
import {MenuItemContainerModel} from './menu-item-container.model';
export interface MenuModel {
  items: (MenuItemModel & MenuItemContainerModel)[];
}
