import { OrderingDirection } from '../interfaces/route-config/ordering-directions';
import { IOrdering } from '../interfaces/route-config/ordering';
import { Sort } from '@angular/material/sort';

export class OrderingHelper {
  public static getOrderingValue(orderingOption: IOrdering): string {
    switch (orderingOption.direction) {
      case OrderingDirection.Ascending:
        return orderingOption.field;
      case OrderingDirection.Descending:
        return '-' + orderingOption.field;
      default:
        return orderingOption.field;
    }
  }
  public static getOrderingOptionFieldAndDirection(orderingValue: string): {
    field: string;
    direction: OrderingDirection;
  } {
    if (orderingValue.startsWith('-')) {
      return {
        field: orderingValue.substr(1),
        direction: OrderingDirection.Descending
      };
    }
    return {
      field: orderingValue,
      direction: OrderingDirection.Ascending
    };
  }
  public static isDescending(orderingOption: IOrdering): boolean {
    switch (orderingOption.direction) {
      case OrderingDirection.Ascending:
        return false;
      case OrderingDirection.Descending:
        return true;
      default:
        return false;
    }
  }

  public static fromSort(sort: Sort): IOrdering {
    return {
      field: sort.active,
      display: null,
      direction: sort.direction === 'asc' ? OrderingDirection.Ascending : OrderingDirection.Descending,
    };
  }

  public static toSort(orderingConfig: IOrdering): Sort {
    return {
      active: orderingConfig.field,
      direction: orderingConfig.direction === OrderingDirection.Ascending ? 'asc' : 'desc',
    };
  }
}
