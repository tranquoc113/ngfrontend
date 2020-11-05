import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IPortModel } from '@fleio-api/openstack/model/port.model';
import { PortListUiService } from '../ports-list-ui.service';

@Component({
  selector: 'app-port-details',
  templateUrl: './port-details.component.html',
  styleUrls: ['./port-details.component.scss']
})
export class PortDetailsComponent extends DetailsBase<IPortModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, portListUiService: PortListUiService) {
    super(route, portListUiService, 'details', 'port');
  }
}
