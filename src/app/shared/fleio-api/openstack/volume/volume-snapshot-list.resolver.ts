import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VolumeSnapshotsApiService } from '@fleio-api/openstack/volume/volume-snapshots-api.service';
import { IVolumeSnapshotModel } from '@fleio-api/openstack/model/volume-snapshot.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IListQueryParams } from '@fleio-api/base-model/list-query-params';

@Injectable({
  providedIn: 'root'
})
export class VolumeSnapshotListResolver implements Resolve<FleioObjectsList<IVolumeSnapshotModel>> {
  constructor(private volumeSnapshotsApiService: VolumeSnapshotsApiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<FleioObjectsList<IVolumeSnapshotModel>> | Promise<FleioObjectsList<IVolumeSnapshotModel>> |
    FleioObjectsList<IVolumeSnapshotModel> {
    return this.volumeSnapshotsApiService.list(
      route.queryParams as IListQueryParams
    ).pipe(
      catchError(() => of(null))
    );
  }
}
