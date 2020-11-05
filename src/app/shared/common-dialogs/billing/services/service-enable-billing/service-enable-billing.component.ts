import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IServiceModel } from '@fleio-api/billing/model/service.model';
import { ServicesApiService } from '@fleio-api/billing/services/service-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-pricing-plan-delete',
  templateUrl: './service-enable-billing.component.html',
  styleUrls: ['./service-enable-billing.component.scss']
})
export class ServiceEnableBillingComponent implements OnInit {
  newCycleStartOptions = [{
    display: 'After last cycle end',
    value: 'after_last_cycle_end'
  }, {
    display: 'Last cycle start',
    value: 'last_cycle_start'
  }, {
    display: 'Today',
    value: 'today'
  }];
  newCycleStartOptionsForm: FormGroup = new FormGroup({
    newCycleStart: new FormControl('after_last_cycle_end', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<ServiceEnableBillingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { service: IServiceModel },
    private servicesApi: ServicesApiService,
    private notificationService: NotificationService,
    ) {
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(false);
  }

  enableServiceBilling() {
    this.servicesApi.objectPostAction(this.data.service.id, 'enable_billing', {
      new_cycle_start: this.newCycleStartOptionsForm.controls.newCycleStart.value
    }).subscribe(result => {
      if (result) {
        this.notificationService.showMessage('Billing enabled');
        this.dialogRef.close('Billing enabled');
      } else {
        this.notificationService.showMessage('Failed to enable billing');
        this.dialogRef.close(false);
      }
    });
  }
}
