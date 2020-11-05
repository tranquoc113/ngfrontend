import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InstancesApiService } from './instances-api.service';
import { IInstanceResizeOptionsModel } from '../model/instance-resize-options.model';

@Injectable({
  providedIn: 'root'
})
export class InstanceResizeOptionsResolver implements Resolve<IInstanceResizeOptionsModel> {
  constructor(private instancesApiService: InstancesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IInstanceResizeOptionsModel> | Promise<IInstanceResizeOptionsModel> | IInstanceResizeOptionsModel {
    return this.instancesApiService.objectGetAction(route.params.id, 'resize')
      .pipe(catchError(() => of(null))) as unknown as IInstanceResizeOptionsModel;
  }
}
