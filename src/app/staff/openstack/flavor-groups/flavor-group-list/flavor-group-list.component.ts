import { Component } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IFlavorGroupModel } from '@fleio-api/openstack/model/flavor-group.model';
import { FlavorGroupListUiService } from '../flavor-group-list-ui.service';

@Component({
  selector: 'app-flavor-group-list',
  templateUrl: './flavor-group-list.component.html',
  styleUrls: ['./flavor-group-list.component.scss']
})
export class FlavorGroupListComponent extends ListBase<IFlavorGroupModel> {

  constructor(
    private route: ActivatedRoute, private flavorGroupListUiService: FlavorGroupListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, flavorGroupListUiService, refreshService, 'flavorGroups');
  }
}
