import { Component, OnInit } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IVolumeSnapshotModel } from '@fleio-api/openstack/model/volume-snapshot.model';
import { VolumeSnapshotListUiService } from '../volume-snapshot-list-ui.service';

@Component({
  selector: 'app-volume-snapshot-list',
  templateUrl: './volume-snapshot-list.component.html',
  styleUrls: ['./volume-snapshot-list.component.scss']
})
export class VolumeSnapshotListComponent extends ListBase<IVolumeSnapshotModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private volumeSnapshotListUiService: VolumeSnapshotListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, volumeSnapshotListUiService, refreshService, 'volumeSnapshots');
  }
}
