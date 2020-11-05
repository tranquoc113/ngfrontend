import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { IClientModel } from '../model/client.model';
import { ClientsApiService } from './clients-api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientListResolver implements Resolve<FleioObjectsList<IClientModel>> {
  constructor(private clientsApi: ClientsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IClientModel>> | Promise<FleioObjectsList<IClientModel>> |
    FleioObjectsList<IClientModel> {
    return this.clientsApi.list(route.queryParams as IListQueryParams).pipe(catchError(() => of(null)));
  }
}
