import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IVolumeBackupModel } from '../model/volume-backup.model';
import { FleioObjectsList } from '../../fleio-objects-list';
import { VolumeBackupsApiService } from './volume-backups-api.service';
import { IListQueryParams } from '@fleio-api/base-model/list-query-params';

@Injectable({
  providedIn: 'root'
})
export class VolumeBackupListResolver implements Resolve<FleioObjectsList<IVolumeBackupModel>> {
  constructor(private volumeBackupsApiService: VolumeBackupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IVolumeBackupModel>> | Promise<FleioObjectsList<IVolumeBackupModel>> |
    FleioObjectsList<IVolumeBackupModel> {
    return this.volumeBackupsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(catchError(() => of(null)));
  }
}
