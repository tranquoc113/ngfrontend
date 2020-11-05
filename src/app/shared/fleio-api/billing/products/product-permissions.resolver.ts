import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';
import { catchError } from 'rxjs/operators';
import { ProductsApiService } from './product-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductPermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private productsApiService: ProductsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.productsApiService.permissions().pipe(catchError(() => of(null)));
  }
}
