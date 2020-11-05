import { ITableHeader } from './table-header';
import { ITableRow } from './table-row';
import { TrackByFunction } from '@angular/core';

export interface ITableData {
  header: ITableHeader;
  rows: ITableRow[];
  expandableRows?: boolean;
  detailComponent?: any;
  trackByFunction?: TrackByFunction<object>;
  fullWidthMobile?: boolean;
  alwaysShowActions?: boolean;
}
