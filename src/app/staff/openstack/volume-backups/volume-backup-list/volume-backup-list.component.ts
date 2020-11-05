import { Component, OnInit } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { VolumeBackupListUIService } from '../volume-backup-list-ui.service';
import { IVolumeBackupModel } from '@fleio-api/openstack/model/volume-backup.model';

@Component({
  selector: 'app-volume-backup-list',
  templateUrl: './volume-backup-list.component.html',
  styleUrls: ['./volume-backup-list.component.scss']
})
export class VolumeBackupListComponent extends ListBase<IVolumeBackupModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private volumeBackupListUIService: VolumeBackupListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, volumeBackupListUIService, refreshService, 'volumeBackups');
  }
}
