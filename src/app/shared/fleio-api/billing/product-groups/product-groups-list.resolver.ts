import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { IProductGroupModel } from '@fleio-api/billing/model/product-group.model';
import { ProductGroupsApiService } from '@fleio-api/billing/product-groups/product-groups-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupsListResolver implements Resolve<FleioObjectsList<IProductGroupModel>> {
  constructor(private productGroupsApiService: ProductGroupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IProductGroupModel>> | Promise<FleioObjectsList<IProductGroupModel>> |
    FleioObjectsList<IProductGroupModel> {
    return this.productGroupsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
