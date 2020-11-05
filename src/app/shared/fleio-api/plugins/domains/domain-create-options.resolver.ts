import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DomainApiService } from './domain-api.service';
import { IDomainCreateOptionsModel } from './model/domain-create-options.model';

@Injectable({
  providedIn: 'root'
})
export class DomainCreateOptionsResolver implements Resolve<IDomainCreateOptionsModel> {
  constructor(private domainApiService: DomainApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IDomainCreateOptionsModel> | Promise<IDomainCreateOptionsModel> | IDomainCreateOptionsModel {
    return this.domainApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IDomainCreateOptionsModel;
  }
}
