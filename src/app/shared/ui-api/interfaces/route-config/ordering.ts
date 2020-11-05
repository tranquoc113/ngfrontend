import { OrderingDirection } from './ordering-directions';

export interface IOrdering {
  field: string;
  display: string;
  direction?: OrderingDirection; // default is ascending
}

