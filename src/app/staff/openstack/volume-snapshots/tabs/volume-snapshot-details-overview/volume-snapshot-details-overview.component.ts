import { Component } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { ConfigService } from '@shared/config/config.service';
import { IVolumeSnapshotModel } from '@fleio-api/openstack/model/volume-snapshot.model';

@Component({
  selector: 'app-volume-snapshot-details-overview',
  templateUrl: './volume-snapshot-details-overview.component.html',
  styleUrls: ['./volume-snapshot-details-overview.component.scss']
})
export class VolumeSnapshotDetailsOverviewComponent extends DetailsComponentBase<IVolumeSnapshotModel> {
  constructor(
    public config: ConfigService,
  ) {
    super();
  }
}
