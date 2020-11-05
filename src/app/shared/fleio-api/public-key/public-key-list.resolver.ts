import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../fleio-objects-list';
import { IPublicKeyModel } from './model/public-key.model';
import { PublicKeysApiService } from './public-key-api.service';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../base-model/list-query-params';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicKeyListResolver implements Resolve<FleioObjectsList<IPublicKeyModel>> {
  constructor(private publicKeysApiService: PublicKeysApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IPublicKeyModel>> | Promise<FleioObjectsList<IPublicKeyModel>> |
    FleioObjectsList<IPublicKeyModel> {
    return this.publicKeysApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
