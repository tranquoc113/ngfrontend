import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../../shared/ui/objects-view/details-component-base';
import { IClientModel } from '../../../../../shared/fleio-api/client-user/model/client.model';
import { ClientsApiService } from '../../../../../shared/fleio-api/client-user/client/clients-api.service';
import { IServiceModel } from '../../../../../shared/fleio-api/billing/model/service.model';
import { IPricingPlanModel } from '../../../../../shared/fleio-api/openstack/model/pricing-plan.model';
import { ChangePricingPlanDialogComponent } from '../../../../../shared/common-tabs/clients-users/clients/client-details-openstack-service/dialogs/change-pricing-plan-dialog/change-pricing-plan-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ResellerEnduserPanelUrlDialogComponent } from './dialogs/reseller-enduser-panel-url-dialog/reseller-enduser-panel-url-dialog.component';
import { CreateResellerServiceDialogComponent } from './dialogs/create-reseller-service-dialog/create-reseller-service-dialog.component';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-client-details-reseller-service',
  templateUrl: './client-details-reseller-service.component.html',
  styleUrls: ['./client-details-reseller-service.component.scss']
})
export class ClientDetailsResellerServiceComponent extends DetailsComponentBase<IClientModel> implements OnInit {
  reseller: {
    resources: {
      [key: number]: {
        id: number;
        plan: IPricingPlanModel;
        enduser_panel_url: string;
        service: number;
      }
    }
    services: Array<IServiceModel>
  };
  constructor(
    private clientsApiService: ClientsApiService,
    private matDialog: MatDialog,
    public config: ConfigService,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setupRefreshTimer(3000);
  }

  changePricingPlan(service: IServiceModel) {
    this.matDialog.open(
      ChangePricingPlanDialogComponent, {
        data: {
          client: this.object,
          service,
          availablePlans: this.object.openstack_billing_plans,
          updateResellerPlan: true
        }
      }
    ).afterClosed().subscribe(result => {
      if (result) {
        this.refreshData();
      }
    });
  }

  changeResellerPanelUrl(service: IServiceModel, initialUrl: string) {
    this.matDialog.open(
      ResellerEnduserPanelUrlDialogComponent, {
        data: {
          client: this.object,
          service,
          initialUrl,
        }
      }
    ).afterClosed().subscribe(result => {
      if (result) {
        this.refreshData();
      }
    });
  }

  createResellerService() {
    this.matDialog.open(
      CreateResellerServiceDialogComponent, {
        data: {
          client: this.object,
        }
      }
    ).afterClosed().subscribe(result => {
      if (result) {
        this.refreshData();
      }
    });
  }

  protected refreshData() {
    this.clientsApiService.resellerServices(
      this.object.id
    ).subscribe(resServices => {
      this.reseller = resServices;
    });
  }

}
