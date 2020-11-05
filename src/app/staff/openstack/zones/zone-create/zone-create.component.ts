import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IZoneModel } from '@fleio-api/openstack/zone/model/zone.model';
import { ZoneListUIService } from '../zone-list-ui.service';

@Component({
  selector: 'app-zone-create',
  templateUrl: './zone-create.component.html',
  styleUrls: ['./zone-create.component.scss']
})
export class ZoneCreateComponent extends DetailsBase<IZoneModel> {
  constructor(route: ActivatedRoute, zoneListUIService: ZoneListUIService) {
    super(route, zoneListUIService, 'create', null, ['createOptions']);
  }
}
