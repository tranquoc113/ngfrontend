import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IAction } from '@objects-view/interfaces/actions/action';
import { ConfigService } from '@shared/config/config.service';
import { INetworkModel } from '@fleio-api/openstack/model/network.model';
import { ISubnetModel } from '@fleio-api/openstack/model/subnet.model';
import { SubnetsApiService } from '@fleio-api/openstack/subnets/subnets-api.service';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { Router } from '@angular/router';
import { AuthService } from '@shared/auth/auth.service';

@Component({
  selector: 'app-network-details-overview',
  templateUrl: './network-details-overview.component.html',
  styleUrls: ['./network-details-overview.component.scss']
})
export class NetworkDetailsOverviewComponent extends DetailsComponentBase<INetworkModel> implements OnInit {
  subnetActions: { [id: number]: IAction };
  displayedColumns = ['name', 'network_address', 'ip_version', 'gateway_ip', '(actions)'];

  constructor(
    public config: ConfigService,
    private subnetsApiService: SubnetsApiService,
    private router: Router,
    public auth: AuthService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.object && this.object.subnets) {
      this.subnetActions = {}
      for (const subnet of this.object.subnets) {
        this.subnetActions[subnet.id] = this.getSubnetActions(subnet);
      }
    }
  }

  getSubnetActions(subnet: ISubnetModel): IAction[] {
    return [
      new RouterLinkAction({
          icon: {name: 'edit', class: 'fl-icons'},
          name: 'Edit subnet',
          tooltip: 'Edit subnet',
          routerUrl: this.config.getPanelUrl(`openstack/networks/${this.object.id}/edit-subnet/${subnet.id}`),
          router: this.router,
        }
      ),
      new ApiCallAction(
        {
          object: subnet,
          icon: {name: 'delete'},
          tooltip: 'Delete subnet',
          name: 'Delete subnet',
          confirmOptions: {
            confirm: true,
            title: 'Delete subnet',
            message: `Are you sure you want to delete subnet ${subnet.name}?`
          },
          successMessage: 'Subnet delete queued',
          errorMessage: 'Failed to delete subnet',
          apiService: this.subnetsApiService,
          callType: CallType.Delete,
          refreshAfterExecute: false,
          redirectAfterExecute: true,
          redirectUrl: this.config.getPanelUrl(`openstack/networks/${this.object.id}`),
        }
      ),
    ];
  }
}
