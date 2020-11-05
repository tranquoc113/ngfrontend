import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VolumeSnapshotsApiService } from '@fleio-api/openstack/volume/volume-snapshots-api.service';
import { IVolumeSnapshotModel } from '@fleio-api/openstack/model/volume-snapshot.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';

@Injectable({
  providedIn: 'root'
})
export class VolumeSnapshotsResolver implements Resolve<FleioObjectsList<IVolumeSnapshotModel>> {
  constructor(private volumeSnapshotsApiService: VolumeSnapshotsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IVolumeSnapshotModel>> | Promise<FleioObjectsList<IVolumeSnapshotModel>> |
    FleioObjectsList<IVolumeSnapshotModel> {
    return this.volumeSnapshotsApiService.list({volume__id: route.params.id}).pipe(
      catchError(() => of(null))
    );
  }
}
