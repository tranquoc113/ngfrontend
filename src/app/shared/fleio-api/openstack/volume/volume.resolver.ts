import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IVolumeModel } from '../model/volume.model';
import { VolumesApiService } from './volumes-api.service';

@Injectable({
  providedIn: 'root'
})
export class VolumeResolver implements Resolve<IVolumeModel> {
  constructor(private volumesApiService: VolumesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IVolumeModel> | Promise<IVolumeModel> | IVolumeModel {
    return this.volumesApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
