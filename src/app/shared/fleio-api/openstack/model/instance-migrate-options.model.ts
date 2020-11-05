export interface IInstanceMigrateOptionsModel {
  current_hypervisor: {id: string; name: string; };
  show_hostname_for_migrate: boolean;
  hypervisors: {id: string; name: string; }[];
}
