import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VolumesApiService } from './volumes-api.service';
import { IVolumeCreateOptionsModel } from '../model/volume-create-options.model';

@Injectable({
  providedIn: 'root'
})
export class VolumeCreateOptionsResolver implements Resolve<IVolumeCreateOptionsModel> {
  constructor(private volumesApiService: VolumesApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IVolumeCreateOptionsModel> | Promise<IVolumeCreateOptionsModel> | IVolumeCreateOptionsModel {
    return this.volumesApiService.createOptions()
      .pipe(catchError(() => of(null))) as unknown as IVolumeCreateOptionsModel;
  }
}
