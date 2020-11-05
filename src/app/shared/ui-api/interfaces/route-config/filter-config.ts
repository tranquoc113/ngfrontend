import { IFilterOption } from './filter-option';
import { IDefaultFilterOption } from './default-filter-option';

export interface IFilterConfig {
  availableOptions: IFilterOption[];
  defaultFilters?: IDefaultFilterOption[];
}
