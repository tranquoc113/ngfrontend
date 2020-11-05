import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { IDomainRegistrarModel } from './model/domain-registrar.model';
import { DomainRegistrarsApiService } from './domain-registrars-api.service';

@Injectable({
  providedIn: 'root'
})
export class DomainRegistrarListResolver implements Resolve<FleioObjectsList<IDomainRegistrarModel>> {
  constructor(private domainRegistrarsApiService: DomainRegistrarsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IDomainRegistrarModel>> | Promise<FleioObjectsList<IDomainRegistrarModel>> |
    FleioObjectsList<IDomainRegistrarModel> {
    return this.domainRegistrarsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
