import { IColumnDefinition } from './column-definition';

export interface ITableHeader {
  columns: IColumnDefinition[];
  columnNames: string[];
  showStatus?: boolean;
  visibleActions?: number;
  hideHeader?: boolean;
}
