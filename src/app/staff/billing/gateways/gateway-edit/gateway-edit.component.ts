import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IGatewayModel } from '@fleio-api/billing/model/gateway.model';
import { GatewayListUiService } from '../gateway-list-ui.service';

@Component({
  selector: 'app-gateway-edit',
  templateUrl: './gateway-edit.component.html',
  styleUrls: ['./gateway-edit.component.scss']
})
export class GatewayEditComponent extends DetailsBase<IGatewayModel> implements OnInit, OnDestroy {

  constructor(route: ActivatedRoute, gatewayListUiService: GatewayListUiService) {
    super(route, gatewayListUiService, 'edit', 'gateway');
  }
}
