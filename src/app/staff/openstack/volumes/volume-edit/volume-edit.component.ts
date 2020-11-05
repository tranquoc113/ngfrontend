import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { ActivatedRoute } from '@angular/router';
import { VolumeListUIService } from '../volume-list-ui.service';

@Component({
  selector: 'app-volume-edit',
  templateUrl: './volume-edit.component.html',
  styleUrls: ['./volume-edit.component.scss']
})
export class VolumeEditComponent extends DetailsBase<IImageModel> {
  constructor(route: ActivatedRoute, volumeListUIService: VolumeListUIService) {
    super(route, volumeListUIService, 'edit', 'volume');
  }
}
