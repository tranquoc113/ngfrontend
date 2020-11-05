import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IProductModel } from '../model/product.model';
import { ProductsApiService } from './product-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProductModel> {
  constructor(private productsApiService: ProductsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IProductModel> | Promise<IProductModel> | IProductModel {
    return this.productsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
