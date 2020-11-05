import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IPermissionsModel } from '../../base-model/IPermissionsModel';
import { catchError } from 'rxjs/operators';
import { VolumeBackupsApiService } from '@fleio-api/openstack/volume/volume-backups-api.service';

@Injectable({
  providedIn: 'root'
})
export class VolumeBackupPermissionsResolver implements Resolve<IPermissionsModel> {
  constructor(private volumeBackupsApiService: VolumeBackupsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IPermissionsModel> | Promise<IPermissionsModel> | IPermissionsModel {
    return this.volumeBackupsApiService.permissions().pipe(catchError(() => of(null)));
  }
}
