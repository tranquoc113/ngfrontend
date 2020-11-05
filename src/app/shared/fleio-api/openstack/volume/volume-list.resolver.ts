import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FleioObjectsList } from '../../fleio-objects-list';
import { Observable, of } from 'rxjs';
import { IListQueryParams } from '../../base-model/list-query-params';
import { catchError } from 'rxjs/operators';
import { VolumesApiService } from './volumes-api.service';
import { IVolumeModel } from '../model/volume.model';

@Injectable({
  providedIn: 'root'
})
export class VolumeListResolver implements Resolve<FleioObjectsList<IVolumeModel>> {
  constructor(private volumesApiService: VolumesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IVolumeModel>> | Promise<FleioObjectsList<IVolumeModel>> |
    FleioObjectsList<IVolumeModel> {
    return this.volumesApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
