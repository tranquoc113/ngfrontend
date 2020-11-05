import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPricingPlanModel } from '../../../../../fleio-api/openstack/model/pricing-plan.model';
import { PricingPlansApiService } from '../../../../../fleio-api/openstack/pricing-plan/pricing-plans-api.service';
import { NotificationService } from '../../../../../ui-api/notification.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pricing-plan-delete',
  templateUrl: './pricing-plan-delete.component.html',
  styleUrls: ['./pricing-plan-delete.component.scss']
})
export class PricingPlanDeleteComponent implements OnInit {
  @ViewChild('formErrors') formErrors;
  alternativePlans: IPricingPlanModel[] = null;
  selectedPlan: FormControl = new FormControl();
  deleteOptions: FormGroup = new FormGroup({
    selectedPlan: this.selectedPlan,
  });

  constructor(
    public dialogRef: MatDialogRef<PricingPlanDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      planToDelete: IPricingPlanModel,
      isStaff: boolean,
      isReseller: boolean,
    },
    private pricingPlansApiService: PricingPlansApiService,
    private notificationService: NotificationService,
    ) {
  }

  ngOnInit() {
    if (this.data && this.data.planToDelete) {
      this.pricingPlansApiService.getAlternativePlans(
        this.data.planToDelete, this.data.isStaff, this.data.isReseller
      ).subscribe(alternativePlans => {
        this.alternativePlans = alternativePlans;
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  delete() {
    if (this.selectedPlan.value > 0 ) {
      this.pricingPlansApiService.delete(
        this.data.planToDelete.id,
        {plan_to_migrate: this.selectedPlan.value},
      ).subscribe(result => {
        if (result) {
          this.dialogRef.close('Plan deleted successfully');
        } else {
          this.dialogRef.close('Failed to delete plan');
        }
      }, error => {
        this.formErrors.setBackendErrors(error.error.detail);
      });
    } else {
      this.notificationService.showMessage('You need to select an alternate pricing plan.');
    }
  }
}
