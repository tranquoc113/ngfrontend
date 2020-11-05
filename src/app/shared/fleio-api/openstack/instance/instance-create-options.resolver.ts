import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InstancesApiService } from './instances-api.service';
import { IInstanceCreateOptions } from '../model/instance-create-options';

@Injectable({
  providedIn: 'root'
})
export class InstanceCreateOptionsResolver implements Resolve<IInstanceCreateOptions> {
  constructor(private instancesApiService: InstancesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IInstanceCreateOptions> | Promise<IInstanceCreateOptions> | IInstanceCreateOptions {
    if (route.queryParams.requestedImage === 'true') {
      if (route.queryParams.image_id) {
        return this.instancesApiService.createOptions({
          image: route.queryParams.image_id
        }).pipe(catchError(() => of(null))) as unknown as IInstanceCreateOptions;
      }
    }
    return this.instancesApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IInstanceCreateOptions;
  }
}
