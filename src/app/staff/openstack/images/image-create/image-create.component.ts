import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { ActivatedRoute } from '@angular/router';
import { ImageListUIService } from '../image-list-ui.service';

@Component({
  selector: 'app-image-create',
  templateUrl: './image-create.component.html',
  styleUrls: ['./image-create.component.scss']
})
export class ImageCreateComponent extends DetailsBase<IImageModel> {
  constructor(route: ActivatedRoute, imageListUIService: ImageListUIService) {
    super(route, imageListUIService, 'create', null);
  }
}
