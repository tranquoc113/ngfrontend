import { IOrdering } from './ordering';

export interface IOrderingConfig {
  default: IOrdering;
  options: IOrdering[];
}
