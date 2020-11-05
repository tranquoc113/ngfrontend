import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { OrdersApiService } from './order-api.service';
import { IOrderModel } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderListResolver implements Resolve<FleioObjectsList<IOrderModel>> {
  constructor(private ordersApiService: OrdersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IOrderModel>> | Promise<FleioObjectsList<IOrderModel>> |
    FleioObjectsList<IOrderModel> {
    return this.ordersApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
