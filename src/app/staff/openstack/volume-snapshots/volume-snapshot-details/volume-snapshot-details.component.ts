import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IVolumeSnapshotModel } from '@fleio-api/openstack/model/volume-snapshot.model';
import { VolumeSnapshotListUiService } from '../volume-snapshot-list-ui.service';

@Component({
  selector: 'app-volume-snapshot-details',
  templateUrl: './volume-snapshot-details.component.html',
  styleUrls: ['./volume-snapshot-details.component.scss']
})
export class VolumeSnapshotDetailsComponent extends DetailsBase<IVolumeSnapshotModel> {
  constructor(route: ActivatedRoute, volumeSnapshotListUiService: VolumeSnapshotListUiService) {
    super(route, volumeSnapshotListUiService, 'details', 'volumeSnapshot');
  }
}
