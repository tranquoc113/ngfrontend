import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { ImageListUIService } from '../image-list-ui.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})
export class ImageDetailsComponent extends DetailsBase<IImageModel> {
  constructor(route: ActivatedRoute, imageListUIService: ImageListUIService) {
    super(route, imageListUIService, 'details', 'image');
  }
}
