import { Component } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { ImageListUIService } from '../image-list-ui.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent extends ListBase<IImageModel> {

  constructor(
    private route: ActivatedRoute, private imageListUIService: ImageListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, imageListUIService, refreshService, 'images');
  }
}
