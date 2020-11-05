import { Component } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { PortListUiService } from '../ports-list-ui.service';
import { IPortModel } from '@fleio-api/openstack/model/port.model';

@Component({
  selector: 'app-port-list',
  templateUrl: './port-list.component.html',
  styleUrls: ['./port-list.component.scss']
})
export class PortListComponent extends ListBase<IPortModel> {

  constructor(
    private route: ActivatedRoute, private portListUiService: PortListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, portListUiService, refreshService, 'ports');
  }
}
