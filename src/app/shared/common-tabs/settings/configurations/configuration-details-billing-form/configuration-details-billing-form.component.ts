import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigurationsApiService } from '../../../../fleio-api/configurations/configurations-api.service';
import { ConfigService } from '../../../../config/config.service';
import { Observable, of } from 'rxjs';
import { DetailsFormBase } from '../../../../ui/objects-view/details-form-base';
import { IProductModel } from '../../../../fleio-api/billing/model/product.model';
import { IActionResult } from '../../../../ui/objects-view/interfaces/actions/action-result';
import { IConfigurationBillingModel } from '../../../../fleio-api/configurations/model/configuration-billing.model';
import { NotificationService } from '../../../../ui-api/notification.service';

@Component({
  selector: 'app-configuration-details-billing-form',
  templateUrl: './configuration-details-billing-form.component.html',
  styleUrls: ['./configuration-details-billing-form.component.scss']
})
export class ConfigurationDetailsBillingFormComponent extends DetailsFormBase<IConfigurationBillingModel>
  implements OnInit {
  configurationBillingForm = this.formBuilder.group({
    // Billing
    credit_required: ['', Validators.required],
    credit_limit: ['', Validators.required],
    minim_uptodate_credit_for_invoice_payment: ['', Validators.required],
    // Limits for clients with agreement
    credit_required_with_agreement: ['', Validators.required],
    credit_limit_with_agreement: ['', Validators.required],
    // Billing cycles
    billing_cycle_as_calendar_month: [''],
    auto_settle_invoiced_periods_external_billing: [''],
    // General
    company_info: ['', Validators.required],
    sender_name: [''],
    sender_email: [''],
    // MaxMind fraud check
    fraud_check: [''],
    enable_maxmind_insights: [''],
    maxmind_fraud_score: [''],
    maxmind_manual_review_score: [''],
    // Client signup automation
    auto_create_order: [false],
    auto_order_service: [-1],
    auto_order_service_cycle: [-1],
    auto_order_service_params: [''],
    client_initial_credit: [0],
    // Invoicing
    generate_invoices: [''],
    do_not_invoice_services_with_zero_price: [''],
    send_notifications_for_unpaid_invoices: [''],
    create_todo_on_invoice_payment: [''],
    auto_settle_usage: [''],
    auto_pay_invoice_only_when_enough_credit: [''],
    invoicing_option: [''],
    detailed_invoices: [''],
    next_paid_invoice_number: ['', Validators.required],
    next_paid_invoice_number_format: ['', Validators.required],
    limit_billable_seconds_per_month: [''],
    billable_seconds_per_month: ['', Validators.required],
    issue_invoice_before_next_due_date: [''],
    next_invoice_date_offset: ['', Validators.required],
    auto_eu_tax_exemption: [''],
    provider_home_country: [''],
    add_tax_for_credit_invoices: [''],
    // Credit notifications
    credit_notifications_enabled: [''],
    credit_notifications_when_agreement_enabled: [''],
    first_credit_remaining_hours: ['', Validators.required],
    first_credit_notification_template: [''],
    second_credit_remaining_hours: ['', Validators.required],
    second_credit_notification_template: [''],
    third_credit_remaining_hours: ['', Validators.required],
    third_credit_notification_template: [''],
    // Suspension
    auto_suspend: [''],
    auto_suspend_delay_hours_enabled: [''],
    auto_suspend_delay_hours: ['', Validators.required],
    auto_suspend_delay_credit_enabled: [''],
    auto_suspend_delay_credit: ['', Validators.required],
    auto_suspend_notification_template: [''],
    // Termination
    auto_terminate: [''],
    suspend_instead_of_terminate: [''],
    auto_terminate_delay_hours: ['', Validators.required],
    auto_terminate_notification_template: ['', Validators.required],
  });

  autoOrderProduct: IProductModel;
  billingConfiguration: IConfigurationBillingModel;
  updatingControls = false;

  constructor(
    private formBuilder: FormBuilder, private configurationsApiService: ConfigurationsApiService,
    private config: ConfigService, private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.initTabData(); // init tab data in case page has no multiple tabs to ensure actionCallback is set
    if (this.objectController) {
      this.billingConfiguration =
        this.objectController.additionalObjects.billingConfiguration as IConfigurationBillingModel;
    }
    this.configurationBillingForm.valueChanges.subscribe(() => {
      if (!this.updatingControls) {
        this.updatingControls = true;
        this.updateMaxMindControls();
        this.updateClientSignupAutomationControls();
        this.updateInvoicingControls();
        this.updateCreditNotificationsControls();
        this.updateSuspensionControls();
        this.updateTerminationControls();
        this.updatingControls = false;
      }
    });

    if (this.billingConfiguration) {
      this.configurationBillingForm.patchValue(this.billingConfiguration);
    }
  }

  protected initTabData() {
    if (this.objectController) {
      this.objectController.actionCallback = () => this.saveConfiguration();
    }
  }

  updateMaxMindControls() {
    const maxMindControls = this.configurationBillingForm.controls;
    if (maxMindControls.fraud_check.value) {
      maxMindControls.enable_maxmind_insights.enable();
      maxMindControls.maxmind_fraud_score.enable();
      maxMindControls.maxmind_manual_review_score.enable();
    } else {
      maxMindControls.enable_maxmind_insights.disable();
      maxMindControls.maxmind_fraud_score.disable();
      maxMindControls.maxmind_manual_review_score.disable();
    }
  }

  updateClientSignupAutomationControls() {
    const clientSignupAutomationControls = this.configurationBillingForm.controls;
    if (clientSignupAutomationControls.auto_create_order.value) {
      clientSignupAutomationControls.auto_order_service.enable();
      clientSignupAutomationControls.auto_order_service_cycle.enable();
      clientSignupAutomationControls.auto_order_service_params.enable();
      clientSignupAutomationControls.client_initial_credit.enable();

      for (const product of this.billingConfiguration.products) {
        if (product.id === clientSignupAutomationControls.auto_order_service.value) {
          this.autoOrderProduct = product;
        }
      }
    } else {
      clientSignupAutomationControls.auto_order_service.disable();
      clientSignupAutomationControls.auto_order_service_cycle.disable();
      clientSignupAutomationControls.auto_order_service_params.disable();
      clientSignupAutomationControls.client_initial_credit.disable();
    }
  }

  updateInvoicingControls() {
    const invoicingControls = this.configurationBillingForm.controls;
    if (invoicingControls.generate_invoices.value) {
      invoicingControls.send_notifications_for_unpaid_invoices.enable();
      invoicingControls.create_todo_on_invoice_payment.enable();
      invoicingControls.auto_settle_usage.enable();

      if (invoicingControls.auto_settle_usage.value) {
        invoicingControls.auto_pay_invoice_only_when_enough_credit.enable();
      } else {
        invoicingControls.auto_pay_invoice_only_when_enough_credit.disable();
      }

      invoicingControls.do_not_invoice_services_with_zero_price.enable();
      invoicingControls.invoicing_option.enable();
      invoicingControls.detailed_invoices.enable();
      invoicingControls.next_paid_invoice_number.enable();
      invoicingControls.next_paid_invoice_number_format.enable();
      invoicingControls.limit_billable_seconds_per_month.enable();

      if (invoicingControls.limit_billable_seconds_per_month.value) {
        invoicingControls.billable_seconds_per_month.enable();
      } else {
        invoicingControls.billable_seconds_per_month.disable();
      }

      invoicingControls.issue_invoice_before_next_due_date.enable();

      if (invoicingControls.issue_invoice_before_next_due_date.value) {
        invoicingControls.next_invoice_date_offset.enable();
      } else {
        invoicingControls.next_invoice_date_offset.disable();
      }

      invoicingControls.auto_eu_tax_exemption.enable();

      if (invoicingControls.auto_eu_tax_exemption.value) {
        invoicingControls.provider_home_country.enable();
      } else {
        invoicingControls.provider_home_country.disable();
      }

    } else {
      invoicingControls.do_not_invoice_services_with_zero_price.disable();
      invoicingControls.send_notifications_for_unpaid_invoices.disable();
      invoicingControls.create_todo_on_invoice_payment.disable();
      invoicingControls.auto_settle_usage.disable();
      invoicingControls.auto_pay_invoice_only_when_enough_credit.disable();
      invoicingControls.invoicing_option.disable();
      invoicingControls.detailed_invoices.disable();
      invoicingControls.next_paid_invoice_number.disable();
      invoicingControls.next_paid_invoice_number_format.disable();
      invoicingControls.limit_billable_seconds_per_month.disable();
      invoicingControls.billable_seconds_per_month.disable();
      invoicingControls.issue_invoice_before_next_due_date.disable();
      invoicingControls.next_invoice_date_offset.disable();
      invoicingControls.auto_eu_tax_exemption.disable();
      invoicingControls.provider_home_country.disable();
    }
  }

  updateCreditNotificationsControls() {
    const creditNotificationsControls = this.configurationBillingForm.controls;
    if (creditNotificationsControls.credit_notifications_enabled.value) {
      creditNotificationsControls.credit_notifications_when_agreement_enabled.enable();
      creditNotificationsControls.first_credit_remaining_hours.enable();
      creditNotificationsControls.first_credit_notification_template.enable();
      creditNotificationsControls.second_credit_remaining_hours.enable();
      creditNotificationsControls.second_credit_notification_template.enable();
      creditNotificationsControls.third_credit_remaining_hours.enable();
      creditNotificationsControls.third_credit_notification_template.enable();
    } else {
      creditNotificationsControls.credit_notifications_when_agreement_enabled.disable();
      creditNotificationsControls.first_credit_remaining_hours.disable();
      creditNotificationsControls.first_credit_notification_template.disable();
      creditNotificationsControls.second_credit_remaining_hours.disable();
      creditNotificationsControls.second_credit_notification_template.disable();
      creditNotificationsControls.third_credit_remaining_hours.disable();
      creditNotificationsControls.third_credit_notification_template.disable();
    }
  }

  updateSuspensionControls() {
    const suspensionControls = this.configurationBillingForm.controls;
    if (suspensionControls.auto_suspend.value) {
      suspensionControls.auto_suspend_delay_hours_enabled.enable();
      if (suspensionControls.auto_suspend_delay_hours_enabled.value) {
        suspensionControls.auto_suspend_delay_hours.enable();
      } else {
        suspensionControls.auto_suspend_delay_hours.disable();
      }

      suspensionControls.auto_suspend_delay_credit_enabled.enable();

      if (suspensionControls.auto_suspend_delay_credit_enabled.value) {
        suspensionControls.auto_suspend_delay_credit.enable();
      } else {
        suspensionControls.auto_suspend_delay_credit.disable();
      }

      suspensionControls.auto_suspend_notification_template.enable();
    } else {
      suspensionControls.auto_suspend_delay_hours_enabled.disable();
      suspensionControls.auto_suspend_delay_hours.disable();
      suspensionControls.auto_suspend_delay_credit_enabled.disable();
      suspensionControls.auto_suspend_delay_credit.disable();
      suspensionControls.auto_suspend_notification_template.disable();
    }
  }

  updateTerminationControls() {
    const terminationControls = this.configurationBillingForm.controls;
    if (terminationControls.auto_terminate.value) {
      terminationControls.auto_terminate_delay_hours.enable();
      terminationControls.auto_terminate_notification_template.enable();
    } else {
      terminationControls.auto_terminate_delay_hours.disable();
      terminationControls.auto_terminate_notification_template.disable();
    }
  }

  saveConfiguration(): Observable<IActionResult> {
    const value = this.configurationBillingForm.value;
    let request;

    value.id = this.object.id;

    if (!value.auto_create_order) {
      value.auto_order_service = -1;
      value.auto_order_service_cycle = -1;
      value.auto_order_service_params = '';
    }

    request = this.configurationsApiService.objectPutAction(value.id, 'billing', value);

    request.subscribe((response) => {
      this.notificationService.showMessage(response.detail);
    }, (error) => {
      this.setErrors(error.error);
    });

    return of(null);
  }
}
