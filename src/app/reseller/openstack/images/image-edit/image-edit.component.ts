import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { ActivatedRoute } from '@angular/router';
import { ImageListUIService } from '../image-list-ui.service';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.scss']
})
export class ImageEditComponent extends DetailsBase<IImageModel> {
  constructor(route: ActivatedRoute, imageListUIService: ImageListUIService) {
    super(route, imageListUIService, 'edit', 'image');
  }
}
