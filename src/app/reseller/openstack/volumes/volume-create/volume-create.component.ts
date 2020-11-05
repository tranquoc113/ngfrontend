import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { ActivatedRoute } from '@angular/router';
import { VolumeListUIService } from '../volume-list-ui.service';

@Component({
  selector: 'app-volume-create',
  templateUrl: './volume-create.component.html',
  styleUrls: ['./volume-create.component.scss']
})
export class VolumeCreateComponent extends DetailsBase<IImageModel> {
  constructor(route: ActivatedRoute, volumeListUIService: VolumeListUIService) {
    super(route, volumeListUIService, 'create', null);
  }
}
