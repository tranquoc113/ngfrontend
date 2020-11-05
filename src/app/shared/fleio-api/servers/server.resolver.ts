import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IServerModel } from './model/server.model';
import { ServersApiService } from './servers-api.service';

@Injectable({
  providedIn: 'root'
})
export class ServerResolver implements Resolve<IServerModel> {
  constructor(private serversApiService: ServersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IServerModel> | Promise<IServerModel> | IServerModel {
    return this.serversApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
