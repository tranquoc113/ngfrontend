import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IVolumeModel } from '../model/volume.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolumesApiService extends FleioApiService<IVolumeModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/volumes'));
  }

  changeBootableStatus(volumeId: FleioId, newStatus: boolean): Observable<any> {
    return this.objectPostAction(volumeId, 'change_bootable_status', {new_status: newStatus})
  }

  revertToSnapshot(volumeId: FleioId, snapshotId: FleioId): Observable<any> {
    return this.objectPostAction(volumeId, 'revert_to_snapshot', {snapshot_id: snapshotId});
  }
}
