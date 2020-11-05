import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { ITLDModel } from './model/tld.model';
import { TLDsApiService } from './tlds-api.service';

@Injectable({
  providedIn: 'root'
})
export class TLDListResolver implements Resolve<FleioObjectsList<ITLDModel>> {
  constructor(private tldsApiService: TLDsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<ITLDModel>> | Promise<FleioObjectsList<ITLDModel>> |
    FleioObjectsList<ITLDModel> {
    return this.tldsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
