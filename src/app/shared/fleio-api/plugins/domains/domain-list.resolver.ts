import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { IDomainModel } from './model/domain.model';
import { DomainApiService } from './domain-api.service';

@Injectable({
  providedIn: 'root'
})
export class DomainListResolver implements Resolve<FleioObjectsList<IDomainModel>> {
  constructor(private domainApiService: DomainApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IDomainModel>> | Promise<FleioObjectsList<IDomainModel>> |
    FleioObjectsList<IDomainModel> {
    return this.domainApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
