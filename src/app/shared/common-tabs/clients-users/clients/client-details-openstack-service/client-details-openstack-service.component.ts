import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../ui/objects-view/details-component-base';
import { IClientModel } from '../../../../fleio-api/client-user/model/client.model';
import { ClientsApiService } from '../../../../fleio-api/client-user/client/clients-api.service';
import { ConfigService } from '../../../../config/config.service';
import { OpenstackClientsApiService } from '@fleio-api/openstack/clients/openstack-clients-api.service';
import { IServiceModel } from '../../../../fleio-api/billing/model/service.model';
import { IProjectModel } from '../../../../fleio-api/openstack/model/project.model';
import { MatDialog } from '@angular/material/dialog';
import { ChangePricingPlanDialogComponent } from './dialogs/change-pricing-plan-dialog/change-pricing-plan-dialog.component';
import { ServicesApiService } from '../../../../fleio-api/billing/services/service-api.service';
import { NotificationService } from '../../../../ui-api/notification.service';
import { CreateOpenstackServiceDialogComponent } from './dialogs/create-openstack-service-dialog/create-openstack-service-dialog.component';

@Component({
  selector: 'app-client-details-openstack-service',
  templateUrl: './client-details-openstack-service.component.html',
  styleUrls: ['./client-details-openstack-service.component.scss']
})
export class ClientDetailsOpenstackServiceComponent extends DetailsComponentBase<IClientModel> implements OnInit {
  openstackServices: IServiceModel[];
  openstackProjects: { [serviceId: number]: IProjectModel };
  hasServiceWithProject = false;
  displayedColumns: string[] = ['date', 'destination', 'source', 'amount'];

  constructor(
    private clientsApi: ClientsApiService,
    private cloudClientsApi: OpenstackClientsApiService,
    public config: ConfigService,
    private matDialog: MatDialog,
    private servicesApi: ServicesApiService,
    private notificationService: NotificationService,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setupRefreshTimer(3000);
  }

  protected refreshData() {
    this.cloudClientsApi.objectGetAction(
      this.object.id, 'openstack_services'
    ).subscribe(openstackServices => {
      this.hasServiceWithProject = false;
      this.openstackServices = openstackServices.services;
      for (const service of this.openstackServices) {
        if (service.status === 'active' || service.status === 'suspended') {
          this.hasServiceWithProject = true;
          break;
        }
      }
      this.openstackProjects = openstackServices.projects;
    });
  }

  changePricingPlan(service: IServiceModel) {
    this.matDialog.open(
      ChangePricingPlanDialogComponent, {
        data: {
          client: this.object,
          availablePlans: this.object.openstack_billing_plans,
          service,
        }
      }
    ).afterClosed().subscribe(result => {
      if (result) {
        this.refreshData();
      }
    });
  }

  terminateService(service: IServiceModel) {
    this.notificationService.confirmDialog({
      title: `Terminate service ${service.id}`,
      message: 'Are you sure?',
      importantMessage: 'This will permanently delete data.',
    }).subscribe(dialogResult => {
      if (dialogResult === 'yes') {
        this.servicesApi.objectPostAction(service.id, 'terminate', {
          id: service.id
        }).subscribe(() => {
          this.notificationService.showMessage('Service termination scheduled');
        });
      }
    });
  }

  createOpenstackService() {
    this.matDialog.open(
      CreateOpenstackServiceDialogComponent, {
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
}
