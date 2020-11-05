import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { VolumeListUIService } from '../volume-list-ui.service';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';

@Component({
  selector: 'app-volume-create',
  templateUrl: './volume-create.component.html',
  styleUrls: ['./volume-create.component.scss']
})
export class VolumeCreateComponent extends DetailsBase<IVolumeModel> {
  constructor(route: ActivatedRoute, volumeListUIService: VolumeListUIService) {
    super(route, volumeListUIService, 'create', null);
  }
}
