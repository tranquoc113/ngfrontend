import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { ActivatedRoute } from '@angular/router';
import { VolumeListUIService } from '../volume-list-ui.service';

@Component({
  selector: 'app-volume-details',
  templateUrl: './volume-details.component.html',
  styleUrls: ['./volume-details.component.scss']
})
export class VolumeDetailsComponent extends DetailsBase<IVolumeModel> {
  constructor(route: ActivatedRoute, volumeListUIService: VolumeListUIService) {
    super(route, volumeListUIService, 'details', 'volume', ['backups', 'snapshots']);
  }
}
