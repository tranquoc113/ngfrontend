import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDomainContactCreateOptionsModel } from './model/domain-contact-create-options.model';
import { DomainContactsApiService } from './domain-contacts-api.service';

@Injectable({
  providedIn: 'root'
})
export class DomainContactCreateOptionsResolver implements Resolve<IDomainContactCreateOptionsModel> {
  constructor(private domainContactsApiService: DomainContactsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IDomainContactCreateOptionsModel> | Promise<IDomainContactCreateOptionsModel> |
    IDomainContactCreateOptionsModel {
    return this.domainContactsApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IDomainContactCreateOptionsModel;
  }
}
