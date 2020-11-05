import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { Observable } from 'rxjs';
import { IVolumeSnapshotModel } from '@fleio-api/openstack/model/volume-snapshot.model';

@Injectable({
  providedIn: 'root'
})
export class VolumeSnapshotsApiService extends FleioApiService<IVolumeSnapshotModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/volumesnapshots'));
  }

  resetState(id: FleioId, state: string): Observable<any> {
    return this.objectPostAction(id, 'reset_state', {
      state,
    })
  }

  getSnapshotForRevert(volumeId: FleioId): Observable<IVolumeSnapshotModel> {
    return this.getAction('get_snapshot_for_revert', {volume_id: volumeId});
  }
}
