export interface ISignupSettingsModel {
  allow_free_email_address: boolean;
  forbidden_domains_for_email_signup: string;
  require_confirmation: boolean;
  domains_for_email_signup_whitelist: string;
}
