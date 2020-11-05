import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClientModel } from '../../../../../../../shared/fleio-api/client-user/model/client.model';
import { IServiceModel } from '../../../../../../../shared/fleio-api/billing/model/service.model';
import { FormBuilder, Validators } from '@angular/forms';
import { OpenstackClientsApiService } from '@fleio-api/openstack/clients/openstack-clients-api.service';
import { NotificationService } from '../../../../../../../shared/ui-api/notification.service';
import { PricingPlansApiService } from '../../../../../../../shared/fleio-api/openstack/pricing-plan/pricing-plans-api.service';
import { ServicesApiService } from '../../../../../../../shared/fleio-api/billing/services/service-api.service';
import { ClientsApiService } from '../../../../../../../shared/fleio-api/client-user/client/clients-api.service';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-reseller-enduser-panel-url-dialog',
  templateUrl: './reseller-enduser-panel-url-dialog.component.html',
  styleUrls: ['./reseller-enduser-panel-url-dialog.component.scss']
})
export class ResellerEnduserPanelUrlDialogComponent implements OnInit {
  changeUrlFrom = this.formBuilder.group({
    enduser_panel_url: ['']
  });

  constructor(
    public dialogRef: MatDialogRef<ResellerEnduserPanelUrlDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      client: IClientModel,
      service: IServiceModel,
      initialUrl: string,
    },
    private formBuilder: FormBuilder,
    private cloudClientsApi: OpenstackClientsApiService,
    private notificationService: NotificationService,
    private pricingPlansApi: PricingPlansApiService,
    private servicesApi: ServicesApiService,
    private clientsApiService: ClientsApiService,
  ) { }

  close() {
    this.dialogRef.close(false);
  }

  changeUrl() {
    this.clientsApiService.changeResellerPanelUrl(
      this.data.client.id,
      this.changeUrlFrom.controls.enduser_panel_url.value,
      this.data.service.id
    ).subscribe(() => {
      this.dialogRef.close(true);
    }, error => {
      this.notificationService.showMessage('Failed to change panel url.');
      return EMPTY;
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.initialUrl) {
      this.changeUrlFrom.controls.enduser_panel_url.setValue(this.data.initialUrl);
    }
  }

}
