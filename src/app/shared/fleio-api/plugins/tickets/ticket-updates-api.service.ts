import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { ConfigService } from '../../../config/config.service';
import { ITicketReplyModel } from './model/ticket-reply.model';

@Injectable({
  providedIn: 'root'
})
export class TicketUpdatesApiService extends FleioApiService<ITicketReplyModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/tickets/ticket_updates'));
  }
}
