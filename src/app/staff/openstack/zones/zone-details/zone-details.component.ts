import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IZoneModel } from '@fleio-api/openstack/zone/model/zone.model';
import { ZoneListUIService } from '../zone-list-ui.service';

@Component({
  selector: 'app-zone-details',
  templateUrl: './zone-details.component.html',
  styleUrls: ['./zone-details.component.scss']
})
export class ZoneDetailsComponent extends DetailsBase<IZoneModel> {
  constructor(route: ActivatedRoute, zoneListUIService: ZoneListUIService) {
    super(route, zoneListUIService, 'details', 'zone', ['records', 'permissions']);
  }
}
