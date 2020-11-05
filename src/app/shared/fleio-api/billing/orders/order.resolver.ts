import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IOrderModel } from '../model/order.model';
import { OrdersApiService } from './order-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<IOrderModel> {
  constructor(private ordersApiService: OrdersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IOrderModel> | Promise<IOrderModel> | IOrderModel {
    return this.ordersApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
