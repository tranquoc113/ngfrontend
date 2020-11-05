export enum ColumnType {
  Value,
  Image,
  Actions,
  Status,
  Currency,
}

export interface IColumnDefinition {
  type: ColumnType;
  displayName: string;
  fieldName: string;
  enableSort: boolean;
  flex?: string;
  flexXs?: string;
  flexGtMd?: string;
  hide?: {};
  wrap?: boolean;
}
