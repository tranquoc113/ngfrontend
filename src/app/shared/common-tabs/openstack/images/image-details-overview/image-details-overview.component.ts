import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-image-details-overview',
  templateUrl: './image-details-overview.component.html',
  styleUrls: ['./image-details-overview.component.scss']
})
export class ImageDetailsOverviewComponent extends DetailsComponentBase<IImageModel> {

  constructor(public config: ConfigService) {
    super();
  }
}
