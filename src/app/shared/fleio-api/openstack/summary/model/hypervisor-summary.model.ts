export interface IHypervisorSummary {
  region: string;
  status: string;
  host_ip: string;
  type: string;
  vcpus_data: Array<number>;
  vcpus_labels: Array<string>;
  disk_data: Array<number>;
  disk_labels: Array<string>;
  memory_data: Array<number>;
  memory_labels: Array<string>;
  label: string;
}
