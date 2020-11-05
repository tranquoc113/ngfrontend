import { Params } from '@angular/router';

export interface MenuItemModel {
  type: string; // menuItem
  route: string;
  href: string;
  angular_route: string;
  angularjs_path: string;
  label: string;
  icon: string;
  icon_class: string;
  queryParams?: Params;
  feature?: string;
  open_in_new_tab?: boolean;
}
