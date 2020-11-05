import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';
import { catchError } from 'rxjs/operators';
import { OrdersApiService } from './order-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderPermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private ordersApiService: OrdersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.ordersApiService.permissions().pipe(catchError(() => of(null)));
  }
}
