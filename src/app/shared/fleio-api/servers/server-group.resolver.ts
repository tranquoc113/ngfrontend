import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IServerGroupModel } from './model/server-group.model';
import { ServerGroupsApiService } from './server-groups-api.service';

@Injectable({
  providedIn: 'root'
})
export class ServerGroupResolver implements Resolve<IServerGroupModel> {
  constructor(private serverGroupsApiService: ServerGroupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IServerGroupModel> | Promise<IServerGroupModel> | IServerGroupModel {
    return this.serverGroupsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
