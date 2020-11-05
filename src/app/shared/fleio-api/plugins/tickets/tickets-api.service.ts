import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { ConfigService } from '../../../config/config.service';
import { ITicketModel } from './model/ticket.model';
import { Observable } from 'rxjs';
import { ITicketCreateOptionsModel } from './model/ticket-create-options.model';
import { FleioId } from '../../base-model/base-fleio-object.model';

@Injectable({
  providedIn: 'root'
})
export class TicketsApiService extends FleioApiService<ITicketModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/tickets/tickets'));
  }

  getCreateOptionsForTicket(ticketId: FleioId): Observable<ITicketCreateOptionsModel> {
    return this.getAction( 'create_options',{ticket_id: ticketId});
  }

  addReply(ticketId: FleioId, replyText: string, associatedAttachments: string): Observable<any> {
    return this.objectPostAction(ticketId, 'add_reply', {
      reply_text: replyText,
      associated_attachments: associatedAttachments,
    });
  }

  addNote(ticketId: FleioId, noteText: string, associatedAttachments: string): Observable<any> {
    return this.objectPostAction(ticketId, 'add_note', {
      note_text: noteText,
      associated_attachments: associatedAttachments,
    });
  }

  markAsRead(ticketId: FleioId): Observable<any> {
    return this.objectPostAction(ticketId, 'mark_as_read', {});
  }

  getTicketsForLinking(ticketId: FleioId, search: string): Observable<any> {
    return this.postAction('get_tickets_for_linking', {
      ticket_id: ticketId,
      search
    });
  }

  getClientRelatedTickets(clientId: FleioId, page: number): Observable<any> {
    return this.getAction('get_client_related_tickets', {
      client_id: clientId,
      page
    });
  }

  getUserRelatedTickets(userId: FleioId, page: number): Observable<any> {
    return this.getAction('get_user_related_tickets', {
      user_id: userId,
      page
    });
  }

}
