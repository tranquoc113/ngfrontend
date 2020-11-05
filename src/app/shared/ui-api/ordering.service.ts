import { Injectable } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Params, Router } from '@angular/router';
import { IOrdering } from './interfaces/route-config/ordering';
import { IRouteConfig } from './interfaces/route-config/route-config';
import { AppLocalStorageService } from './app-local-storage.service';
import { OrderingHelper } from './helpers/ordering-helper';
import { IOrderingConfig } from './interfaces/route-config/ordering-config';
import { BehaviorSubject, Observable } from 'rxjs';
import { RouteHelper } from './route-helper';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderingService {
  private orderingBS: BehaviorSubject<IOrderingConfig>;
  ordering$: Observable<IOrderingConfig>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appLocalStorage: AppLocalStorageService,
  ) {
    this.orderingBS = new BehaviorSubject<IOrderingConfig>(null);
    this.ordering$ = this.orderingBS.asObservable();

    router.events.pipe(
      filter((event) => {
        return event instanceof NavigationEnd;
      }),
    ).subscribe(() => {
      const snapshot = new RouteHelper(activatedRoute).getFinalRoute().snapshot;
      if (snapshot && snapshot.queryParams) {
        const ordering = this.getOrderingConfig(snapshot.data, snapshot.queryParams);

        if (ordering) {
          this.orderingBS.next(ordering);
        }
      }
    });
  }

  private getOrderingConfig(data: Data, queryParams: Params) {
    if (!data.config) {
      return null;
    }
    const routeConfig = data.config as IRouteConfig;
    if (!routeConfig.ordering) {
      return null;
    }

    const ordering = Object.assign({}, routeConfig.ordering);
    if (queryParams.ordering) {
      const queryOrdering = OrderingHelper.getOrderingOptionFieldAndDirection(
        queryParams.ordering
      );
      for (const orderOption of ordering.options) {
        if (orderOption.field === queryOrdering.field) {
          ordering.default = orderOption;
          ordering.default.direction = queryOrdering.direction;
        }
      }
    } else {
      const savedOrdering = this.appLocalStorage.getOrderingItem();
      if (savedOrdering) {
        ordering.default = this.appLocalStorage.getOrderingItem();
      }
    }
    return ordering;
  }

  public orderBy(ordering: IOrdering) {
    if (ordering) {
      const orderingValue = OrderingHelper.getOrderingValue(ordering);
      const queryParams = {ordering: undefined};
      Object.assign(queryParams, this.activatedRoute.snapshot.queryParams);
      const urlOrderingValue = queryParams.ordering;
      if (urlOrderingValue !== orderingValue) {
        queryParams.ordering = orderingValue ? orderingValue : undefined;
        this.appLocalStorage.setOrderingItem(ordering);
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          replaceUrl: !urlOrderingValue,
          queryParams,
        }).then(() => {});
      }
    }
  }

  getQueryParams(routeUrl: string): Params {
    const ordering = this.appLocalStorage.getOrderingItem(routeUrl);
    if (ordering) {
      return {
        ordering: OrderingHelper.getOrderingValue(ordering),
      };
    }

    return null;
  }
}
