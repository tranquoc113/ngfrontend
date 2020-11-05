import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { IInstanceModel } from '../model/instance.model';
import { Observable, of } from 'rxjs';
import { InstancesApiService } from './instances-api.service';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstanceListResolver implements Resolve<FleioObjectsList<IInstanceModel>> {
  constructor(private instancesApi: InstancesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IInstanceModel>> | Promise<FleioObjectsList<IInstanceModel>> |
    FleioObjectsList<IInstanceModel> {
    return this.instancesApi.list(route.queryParams as IListQueryParams).pipe(catchError(() => of(null)));
  }
}
