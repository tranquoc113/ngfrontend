import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DomainApiService } from './domain-api.service';
import { IDomainModel } from './model/domain.model';

@Injectable({
  providedIn: 'root'
})
export class DomainResolver implements Resolve<IDomainModel> {
  constructor(private domainApiService: DomainApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IDomainModel> | Promise<IDomainModel> | IDomainModel {
    return this.domainApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
