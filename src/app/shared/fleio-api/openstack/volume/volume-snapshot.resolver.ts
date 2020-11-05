import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IVolumeSnapshotModel } from '@fleio-api/openstack/model/volume-snapshot.model';
import { VolumeSnapshotsApiService } from '@fleio-api/openstack/volume/volume-snapshots-api.service';

@Injectable({
  providedIn: 'root'
})
export class VolumeSnapshotResolver implements Resolve<IVolumeSnapshotModel> {
  constructor(private volumeSnapshotsApiService: VolumeSnapshotsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<IVolumeSnapshotModel> | Promise<IVolumeSnapshotModel> | IVolumeSnapshotModel {
    return this.volumeSnapshotsApiService.get(route.params.id).pipe(catchError(() => of(null)));
  }
}
