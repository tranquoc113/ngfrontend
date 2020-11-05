import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { IDomainContactModel } from './model/domain-contact.model';
import { DomainContactsApiService } from './domain-contacts-api.service';

@Injectable({
  providedIn: 'root'
})
export class DomainContactListResolver implements Resolve<FleioObjectsList<IDomainContactModel>> {
  constructor(private domainContactsApiService: DomainContactsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IDomainContactModel>> | Promise<FleioObjectsList<IDomainContactModel>> |
    FleioObjectsList<IDomainContactModel> {
    return this.domainContactsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
