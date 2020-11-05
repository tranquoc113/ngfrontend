export interface IOpenstackCredentialsModel {
  auth_url: string;
  default_interface: string;
  user_domain_id: string;
  user_project_id: string;
  require_valid_ssl: boolean;
  username: string;
  password?: string;
}
