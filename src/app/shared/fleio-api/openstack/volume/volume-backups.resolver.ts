import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IVolumeBackupModel } from '../model/volume-backup.model';
import { FleioObjectsList } from '../../fleio-objects-list';
import { VolumeBackupsApiService } from './volume-backups-api.service';

@Injectable({
  providedIn: 'root'
})
export class VolumeBackupsResolver implements Resolve<FleioObjectsList<IVolumeBackupModel>> {
  constructor(private volumeBackupsApiService: VolumeBackupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IVolumeBackupModel>> | Promise<FleioObjectsList<IVolumeBackupModel>> |
    FleioObjectsList<IVolumeBackupModel> {
    return this.volumeBackupsApiService.list({volume__id: route.params.id}).pipe(
      catchError(() => of(null))
    );
  }
}
