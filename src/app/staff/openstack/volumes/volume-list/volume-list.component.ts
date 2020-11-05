import { Component, OnInit } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { IVolumeModel } from '@fleio-api/openstack/model/volume.model';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { VolumeListUIService } from '../volume-list-ui.service';

@Component({
  selector: 'app-volume-list',
  templateUrl: './volume-list.component.html',
  styleUrls: ['./volume-list.component.scss']
})
export class VolumeListComponent extends ListBase<IVolumeModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private volumeListUIService: VolumeListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, volumeListUIService, refreshService, 'volumes');
  }
}
