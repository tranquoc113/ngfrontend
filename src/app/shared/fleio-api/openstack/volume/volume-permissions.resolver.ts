import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';
import { catchError } from 'rxjs/operators';
import { VolumesApiService } from './volumes-api.service';

@Injectable({
  providedIn: 'root'
})
export class VolumePermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private volumesApi: VolumesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.volumesApi.permissions().pipe(catchError(() => of(null)));
  }
}
