import { Component } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IZoneModel } from '@fleio-api/openstack/zone/model/zone.model';
import { ZoneListUIService } from '../zone-list-ui.service';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent extends ListBase<IZoneModel> {

  constructor(
    private route: ActivatedRoute, private zoneListUIService: ZoneListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, zoneListUIService, refreshService, 'zones');
  }
}
