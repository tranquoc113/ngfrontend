import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientsApiService } from './clients-api.service';
import { catchError } from 'rxjs/operators';
import { IClientCreateOptions } from '../model/client-create-options';

@Injectable({
  providedIn: 'root'
})
export class ClientCreateOptionsResolver implements Resolve<IClientCreateOptions> {
  constructor(private clientsApi: ClientsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IClientCreateOptions> | Promise<IClientCreateOptions> | IClientCreateOptions {
    return this.clientsApi.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IClientCreateOptions;
  }
}
