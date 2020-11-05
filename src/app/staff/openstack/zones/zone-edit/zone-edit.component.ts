import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { ZoneListUIService } from '../zone-list-ui.service';
import { IZoneModel } from '@fleio-api/openstack/zone/model/zone.model';

@Component({
  selector: 'app-zone-edit',
  templateUrl: './zone-edit.component.html',
  styleUrls: ['./zone-edit.component.scss']
})
export class ZoneEditComponent extends DetailsBase<IZoneModel> {
  constructor(route: ActivatedRoute, zoneListUIService: ZoneListUIService) {
    super(route, zoneListUIService, 'edit', 'zone', ['createOptions']);
  }
}
