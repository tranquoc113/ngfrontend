import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { IServiceModel } from '../model/service.model';
import { ServicesApiService } from './service-api.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceListResolver implements Resolve<FleioObjectsList<IServiceModel>> {
  constructor(private servicesApiService: ServicesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IServiceModel>> | Promise<FleioObjectsList<IServiceModel>> |
    FleioObjectsList<IServiceModel> {
    return this.servicesApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
