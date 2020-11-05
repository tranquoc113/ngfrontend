import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IVolumeBackupModel } from '@fleio-api/openstack/model/volume-backup.model';
import { VolumeBackupListUIService } from '../volume-backup-list-ui.service';

@Component({
  selector: 'app-volume-backup-details',
  templateUrl: './volume-backup-details.component.html',
  styleUrls: ['./volume-backup-details.component.scss']
})
export class VolumeBackupDetailsComponent extends DetailsBase<IVolumeBackupModel> {
  constructor(route: ActivatedRoute, volumeBackupListUIService: VolumeBackupListUIService) {
    super(route, volumeBackupListUIService, 'details', 'volumeBackup');
  }
}
