import { Component } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IGatewayModel } from '@fleio-api/billing/model/gateway.model';
import { GatewayListUiService } from '../gateway-list-ui.service';

@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.scss']
})
export class GatewayListComponent extends ListBase<IGatewayModel> {

  constructor(
    private route: ActivatedRoute, private gatewayListUiService: GatewayListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, gatewayListUiService, refreshService, 'gateways');
  }
}
