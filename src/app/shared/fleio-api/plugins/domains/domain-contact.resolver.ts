import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDomainContactModel } from './model/domain-contact.model';
import { DomainContactsApiService } from './domain-contacts-api.service';

@Injectable({
  providedIn: 'root'
})
export class DomainContactResolver implements Resolve<IDomainContactModel> {
  constructor(private domainContactsApiService: DomainContactsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IDomainContactModel> | Promise<IDomainContactModel> | IDomainContactModel {
    return this.domainContactsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
