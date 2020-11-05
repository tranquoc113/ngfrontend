import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IOpenstackBackupSchedule } from '@fleio-api/openstack/model/openstack-backup-schedule.model';

@Injectable({
  providedIn: 'root'
})
export class BackupSchedulesApiService extends FleioApiService<IOpenstackBackupSchedule> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('osbackup'));
  }
}
