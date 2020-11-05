export interface IOpenstackDefaultsModel {
  hide_projects_and_api_users: boolean;
  timeout: number;
  default_project_name: string;
  hide_project_ids: string;
  default_region: string;
  prefix_api_users_with_username: boolean;
  default_project_description: string;
  default_role: string;
  force_config_drive_for_instance_creation: boolean;
  project_domain_id: string;
  auto_allocated_topology: boolean;
  available_role_options: {
    id: string;
    name: string;
  }[];
  available_region_options: {
    id: string;
  }[];
}
