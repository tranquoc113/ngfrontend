import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDomainRegistrarModel } from './model/domain-registrar.model';
import { DomainRegistrarsApiService } from './domain-registrars-api.service';

@Injectable({
  providedIn: 'root'
})
export class DomainRegistrarResolver implements Resolve<IDomainRegistrarModel> {
  constructor(private domainRegistrarsApiService: DomainRegistrarsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IDomainRegistrarModel> | Promise<IDomainRegistrarModel> | IDomainRegistrarModel {
    return this.domainRegistrarsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
