import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { ConfigService } from '../../../config/config.service';
import { ITicketDepartmentModel } from './model/ticket-department.model';

@Injectable({
  providedIn: 'root'
})
export class TicketDepartmentsApiService extends FleioApiService<ITicketDepartmentModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/tickets/departments'));
  }
}
