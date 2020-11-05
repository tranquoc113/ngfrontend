import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClientModel } from '../../../../../../fleio-api/client-user/model/client.model';
import { NotificationService } from '../../../../../../ui-api/notification.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { IPricingPlanModel } from '../../../../../../fleio-api/openstack/model/pricing-plan.model';
import { IServiceModel } from '../../../../../../fleio-api/billing/model/service.model';
import { OpenstackClientsApiService } from '@fleio-api/openstack/clients/openstack-clients-api.service';
import { PricingPlansApiService } from '../../../../../../fleio-api/openstack/pricing-plan/pricing-plans-api.service';
import { ServicesApiService } from '../../../../../../fleio-api/billing/services/service-api.service';
import { ClientsApiService } from '../../../../../../fleio-api/client-user/client/clients-api.service';

@Component({
  selector: 'app-change-pricing-plan-dialog',
  templateUrl: './change-pricing-plan-dialog.component.html',
  styleUrls: ['./change-pricing-plan-dialog.component.scss']
})
export class ChangePricingPlanDialogComponent implements OnInit {
  changePlanFrom = this.formBuilder.group({
    selectedPlan: [null, Validators.required]
  });

  selectedPlan = this.changePlanFrom.controls.selectedPlan;
  currentPlan: IPricingPlanModel;
  availablePlans: Array<IPricingPlanModel>;

  constructor(
    public dialogRef: MatDialogRef<ChangePricingPlanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      client: IClientModel,
      service: IServiceModel,
      availablePlans: Array<IPricingPlanModel>,
      updateResellerPlan: boolean,
    },
    private formBuilder: FormBuilder,
    private cloudClientsApi: OpenstackClientsApiService,
    private notificationService: NotificationService,
    private pricingPlansApi: PricingPlansApiService,
    private servicesApi: ServicesApiService,
    private clientsApiService: ClientsApiService,
  ) {
  }

  ngOnInit() {
    if (this.data && this.data.service) {
      this.currentPlan = this.data.service.pricing_plan;
    }
    if (this.data && !this.data.availablePlans) {
      this.pricingPlansApi.list().subscribe(availablePlans => {
        this.availablePlans = availablePlans.objects;
      });
    } else {
      this.availablePlans = this.data.availablePlans;
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  hasOnlySelectedPlan() {
    if (this.availablePlans && this.availablePlans.length === 1 && this.currentPlan) {
      if (this.availablePlans[0].id === this.currentPlan.id) {
        return true;
      }
    }
    return false;
  }

  changePlan() {
    if (this.data && this.data.updateResellerPlan) {
      this.clientsApiService.changeResellerPricingPlan(
        this.data.client.id,
        this.selectedPlan.value,
        this.data.service.id
      ).subscribe(() => {
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showMessage('Failed to change pricing plan');
        return EMPTY;
      });
    } else {
      this.servicesApi.objectPostAction(this.data.service.id, 'update_billing_plan', {
        plan: this.selectedPlan.value,
      }).pipe(
        catchError(() => {
          this.notificationService.showMessage('Failed to change pricing plan');
          return EMPTY;
        }),
      ).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
