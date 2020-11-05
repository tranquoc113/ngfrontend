import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IPortModel } from '@fleio-api/openstack/model/port.model';
import { ActivatedRoute } from '@angular/router';
import { PortListUiService } from '../ports-list-ui.service';

@Component({
  selector: 'app-port-edit',
  templateUrl: './port-edit.component.html',
  styleUrls: ['./port-edit.component.scss']
})
export class PortEditComponent extends DetailsBase<IPortModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, portListUiService: PortListUiService) {
    super(route, portListUiService, 'edit', 'port', ['createOptions']);
  }
}
