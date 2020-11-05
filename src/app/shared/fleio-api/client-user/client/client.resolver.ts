import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IClientModel } from '../model/client.model';
import { ClientsApiService } from './clients-api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientResolver implements Resolve<IClientModel> {
  constructor(private clientsApi: ClientsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IClientModel> | Promise<IClientModel> | IClientModel {
    return this.clientsApi.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
