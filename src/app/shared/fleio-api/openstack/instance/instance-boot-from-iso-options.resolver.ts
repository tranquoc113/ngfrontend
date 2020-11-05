import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InstancesApiService } from './instances-api.service';
import { IInstanceRescueOptionsModel } from '../model/instance-rescue-options.model';

@Injectable({
  providedIn: 'root'
})
export class InstanceBootFromIsoOptionsResolver implements Resolve<IInstanceRescueOptionsModel> {
  constructor(private instancesApiService: InstancesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IInstanceRescueOptionsModel> | Promise<IInstanceRescueOptionsModel> | IInstanceRescueOptionsModel {
    return this.instancesApiService.objectGetAction(route.params.id, 'boot_from_iso')
      .pipe(catchError(() => of(null))) as unknown as IInstanceRescueOptionsModel;
  }
}
