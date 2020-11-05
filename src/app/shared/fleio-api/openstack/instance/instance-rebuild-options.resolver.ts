import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InstancesApiService } from './instances-api.service';
import { IInstanceRebuildOptionsModel } from '../model/instance-rebuild-options.model';

@Injectable({
  providedIn: 'root'
})
export class InstanceRebuildOptionsResolver implements Resolve<IInstanceRebuildOptionsModel> {
  constructor(private instancesApiService: InstancesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IInstanceRebuildOptionsModel> | Promise<IInstanceRebuildOptionsModel> | IInstanceRebuildOptionsModel {
    return this.instancesApiService.objectGetAction(route.params.id, 'rebuild')
      .pipe(catchError(() => of(null))) as unknown as IInstanceRebuildOptionsModel;
  }
}
