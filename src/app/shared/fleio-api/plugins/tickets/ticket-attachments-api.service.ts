import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { ConfigService } from '../../../config/config.service';
import { ITicketAttachmentModel } from './model/ticket-attachment.model';

@Injectable({
  providedIn: 'root'
})
export class TicketAttachmentsApiService extends FleioApiService<ITicketAttachmentModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/tickets/ticket_attachments'));
  }
}
