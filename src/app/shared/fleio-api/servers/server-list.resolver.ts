import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IServerModel } from './model/server.model';
import { FleioObjectsList } from '../fleio-objects-list';
import { ServersApiService } from './servers-api.service';
import { IListQueryParams } from '../base-model/list-query-params';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerListResolver implements Resolve<FleioObjectsList<IServerModel>> {
  constructor(private serversApiService: ServersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IServerModel>> | Promise<FleioObjectsList<IServerModel>> |
    FleioObjectsList<IServerModel> {
    return this.serversApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
