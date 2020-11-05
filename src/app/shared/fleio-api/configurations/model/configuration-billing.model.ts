import { IProductModel } from '../../billing/model/product.model';
import { IBaseFleioObjectModel } from '../../base-model/base-fleio-object.model';

export interface IConfigurationBillingModel  extends IBaseFleioObjectModel {
  credit_limit: number;
  credit_required: number;
  auto_resume_client_on_credit_update: boolean;
  credit_limit_with_agreement: number;
  credit_required_with_agreement: number;
  auto_suspend: boolean;
  auto_suspend_delay_hours_enabled: boolean;
  auto_suspend_delay_hours: number;
  auto_suspend_delay_credit_enabled: boolean;
  auto_suspend_delay_credit: number;
  auto_suspend_notification_template: any;
  auto_terminate: boolean;
  auto_terminate_delay_hours: number;
  suspend_instead_of_terminate: boolean;
  auto_terminate_notification_template: any;
  credit_notifications_enabled: boolean;
  credit_notifications_when_agreement_enabled: boolean;
  first_credit_remaining_hours: number;
  first_credit_notification_template: any;
  second_credit_remaining_hours: number;
  second_credit_notification_template: any;
  third_credit_remaining_hours: number;
  third_credit_notification_template: any;
  sender_email: string;
  sender_name: string;
  company_info: string;
  auto_eu_tax_exemption: boolean;
  generate_invoices: boolean;
  create_todo_on_invoice_payment: boolean;
  send_notifications_for_unpaid_invoices: boolean;
  auto_settle_usage: boolean;
  auto_pay_invoice_only_when_enough_credit: boolean;
  next_paid_invoice_number: number;
  next_paid_invoice_number_format: string;
  minim_uptodate_credit_for_invoice_payment: number;
  invoicing_option: string;
  limit_billable_seconds_per_month: boolean;
  billable_seconds_per_month: number;
  issue_invoice_before_next_due_date: boolean;
  next_invoice_date_offset: number;
  billing_cycle_as_calendar_month: boolean;
  fraud_check: boolean;
  maxmind_manual_review_score: number;
  maxmind_fraud_score: number;
  enable_maxmind_insights: boolean;
  auto_create_order: boolean;
  auto_order_service: boolean;
  auto_order_service_cycle: number;
  auto_order_service_params: any;
  client_initial_credit: number;
  notification_templates: object[];
  products: IProductModel[];
  countries: [string, string][];
}
