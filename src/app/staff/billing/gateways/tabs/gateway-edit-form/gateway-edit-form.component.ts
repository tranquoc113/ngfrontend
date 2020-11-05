import { Component, OnInit } from '@angular/core';
import { DetailsFormBase } from '@objects-view/details-form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { Observable, of } from 'rxjs';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { IGatewayModel } from '@fleio-api/billing/model/gateway.model';
import { GatewayApiService } from '@fleio-api/billing/gateways/gateway-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-gateway-edit-form',
  templateUrl: './gateway-edit-form.component.html',
  styleUrls: ['./gateway-edit-form.component.scss']
})
export class GatewayEditFormComponent extends DetailsFormBase<IGatewayModel> implements OnInit {
  gatewayForm = this.formBuilder.group({
    enabled: [false],
    visible_to_user: [false],
    recurring_payments_enabled: [false],
    display_name: ['', Validators.required],
    instructions: [''],
    fixed_fee: [0],
    percent_fee: [0],
  });

  capabilities: {
    can_process_payments?: boolean;
    returns_fee_information?: boolean;
    supports_recurring_payments?: boolean;
  } = {};

  constructor(
    private formBuilder: FormBuilder,
    private gatewayApiService: GatewayApiService,
    private router: Router,
    private config: ConfigService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.objectController) {
      this.objectController.actionCallback = () => this.gatewayActions();
    }

    if (this.object) {
      this.gatewayForm.patchValue(this.object);
      this.capabilities = this.object.module_settings.capabilities;
    }

    if (!this.capabilities.supports_recurring_payments) {
      this.gatewayForm.controls.recurring_payments_enabled.disable()
    }

    if (!this.capabilities.can_process_payments) {
      this.gatewayForm.controls.visible_to_user.disable()
    }

    if (this.capabilities.returns_fee_information) {
      this.gatewayForm.controls.fixed_fee.disable()
      this.gatewayForm.controls.percent_fee.disable()
    }
  }

  gatewayActions(): Observable<IActionResult> {
    const value = this.gatewayForm.value as IGatewayModel;

    this.createOrUpdate(
      this.gatewayApiService,
      value,
    ).subscribe(() => {
      this.notificationService.showMessage('Gateway saved');
    });

    return of(null);
  }
}
