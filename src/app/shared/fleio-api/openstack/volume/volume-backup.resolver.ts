import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VolumeBackupsApiService } from '@fleio-api/openstack/volume/volume-backups-api.service';
import { IVolumeBackupModel } from '@fleio-api/openstack/model/volume-backup.model';

@Injectable({
  providedIn: 'root'
})
export class VolumeBackupResolver implements Resolve<IVolumeBackupModel> {
  constructor(private volumeBackupsApiService: VolumeBackupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IVolumeBackupModel> | Promise<IVolumeBackupModel> | IVolumeBackupModel {
    return this.volumeBackupsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
