import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IPortModel } from '@fleio-api/openstack/model/port.model';
import { ActivatedRoute } from '@angular/router';
import { PortListUiService } from '../ports-list-ui.service';

@Component({
  selector: 'app-port-create',
  templateUrl: './port-create.component.html',
  styleUrls: ['./port-create.component.scss']
})
export class PortCreateComponent extends DetailsBase<IPortModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, portListUiService: PortListUiService) {
    super(route, portListUiService, 'create', null, ['createOptions']);
  }
}
