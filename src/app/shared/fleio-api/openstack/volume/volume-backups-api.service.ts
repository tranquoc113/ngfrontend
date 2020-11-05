import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IVolumeBackupModel } from '@fleio-api/openstack/model/volume-backup.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolumeBackupsApiService extends FleioApiService<IVolumeBackupModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/volumebackups'));
  }

  restore(backupId: FleioId, volumeId: FleioId, name: string): Observable<any> {
    const params: {[key: string]: any} = {};
    if (volumeId) {
      params.volume_id = volumeId;
    }
    if (name) {
      params.name = name;
    }
    return this.objectPostAction(backupId, 'restore', params);
  }
}
