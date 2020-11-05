import { FilterTypes } from './filter-types';

export interface IFilterOption {
  field: string;
  display: string;
  type: FilterTypes;
  items?: string;
  itemsDisplayField?: string;
  itemsFilter?: {
    [field: string]: any;
  };
}
