import { Injectable } from '@angular/core';
import { IInstanceModel } from '../model/instance.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { InstancesApiService } from './instances-api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstanceResolver implements Resolve<IInstanceModel> {
  constructor(private instancesApi: InstancesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IInstanceModel> | Promise<IInstanceModel> | IInstanceModel {
    return this.instancesApi.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
