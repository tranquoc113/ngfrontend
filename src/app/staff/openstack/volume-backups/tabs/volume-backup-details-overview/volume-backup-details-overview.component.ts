import { Component } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { ConfigService } from '@shared/config/config.service';
import { IVolumeBackupModel } from '@fleio-api/openstack/model/volume-backup.model';

@Component({
  selector: 'app-volume-backup-details-overview',
  templateUrl: './volume-backup-details-overview.component.html',
  styleUrls: ['./volume-backup-details-overview.component.scss']
})
export class VolumeBackupDetailsOverviewComponent extends DetailsComponentBase<IVolumeBackupModel> {

  constructor(
    public config: ConfigService,
  ) {
    super();
  }
}
