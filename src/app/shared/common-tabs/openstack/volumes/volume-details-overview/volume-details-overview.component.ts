import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { ConfigService } from '../../../../config/config.service';

@Component({
  selector: 'app-volume-details-overview',
  templateUrl: './volume-details-overview.component.html',
  styleUrls: ['./volume-details-overview.component.scss']
})
export class VolumeDetailsOverviewComponent extends DetailsComponentBase<IVolumeModel> {
  constructor(
    public config: ConfigService,
  ) {
    super();
  }
}
