import { IHypervisorSummary } from '@fleio-api/openstack/summary/model/hypervisor-summary.model';

export interface IHypervisorsSummaryResponse {
  hypervisors: Array<IHypervisorSummary>;
}
