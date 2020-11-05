import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IProductCreateOptions } from '../model/product-create-options.model';
import { ProductsApiService } from './product-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCreateOptionsResolver implements Resolve<IProductCreateOptions> {
  constructor(private productsApi: ProductsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IProductCreateOptions> | Promise<IProductCreateOptions> | IProductCreateOptions {
    return this.productsApi.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IProductCreateOptions;
  }
}
