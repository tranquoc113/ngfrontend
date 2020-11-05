import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { IProductModel } from '../model/product.model';
import { ProductsApiService } from './product-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductListResolver implements Resolve<FleioObjectsList<IProductModel>> {
  constructor(private productsApiService: ProductsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IProductModel>> | Promise<FleioObjectsList<IProductModel>> |
    FleioObjectsList<IProductModel> {
    return this.productsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
