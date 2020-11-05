import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOperatingSystemsSummary } from '@fleio-api/openstack/summary/model/operating-systems-summary.model';
import { IHypervisorsSummaryResponse } from '@fleio-api/openstack/summary/model/hypervisors-summary.model';

@Injectable({
  providedIn: 'root'
})
export class OpenstackSummaryApiService extends FleioApiService<any> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('openstack/summary'));
  }

  getOperatingSystemsSummary(): Observable<IOperatingSystemsSummary> {
    return this.getAction('operating_systems');
  }

  getHypervisorsSummary(): Observable<IHypervisorsSummaryResponse> {
    return this.getAction('hypervisors');
  }
}
