import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IServerCreateOptionsModel } from './model/server-create-options.model';
import { ServersApiService } from './servers-api.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerCreateOptionsResolver implements Resolve<IServerCreateOptionsModel> {
  constructor(private serversApiService: ServersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IServerCreateOptionsModel> | Promise<IServerCreateOptionsModel> | IServerCreateOptionsModel {
    return this.serversApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IServerCreateOptionsModel;
  }
}
