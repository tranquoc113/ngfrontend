import {MenuItemModel} from './menu-item.model';

export interface MenuItemContainerModel {
  type: string; // menuItemContainer
  category: string;
  main_feature?: string;
  items: MenuItemModel[];
}
