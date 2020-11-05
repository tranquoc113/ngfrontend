import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IClientGroupModel } from '../model/client-group.model';
import { ClientGroupsApiService } from './client-groups-api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientGroupResolver implements Resolve<IClientGroupModel> {
  constructor(private clientGroupsApi: ClientGroupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IClientGroupModel> | Promise<IClientGroupModel> | IClientGroupModel {
    return this.clientGroupsApi.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
