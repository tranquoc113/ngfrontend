import { ISearchConfig } from './search-config';
import { ISubheaderConfig } from './subheader-config';
import { IOrderingConfig } from './ordering-config';
import { IFilterConfig } from './filter-config';

export interface IRouteConfig {
  search?: ISearchConfig;
  ordering?: IOrderingConfig;
  filterConfig?: IFilterConfig;
  subheader?: ISubheaderConfig;
  defaultDisplayList?: boolean;
  feature?: string;
  getBreadCrumbDetail?(data): string;
}
