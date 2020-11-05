import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { ConfigService } from '../../../config/config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketLinkingApiService extends FleioApiService<any> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/tickets/ticket_links'));
  }

  removeLinking(linkId: string, deleteSymmetrical: boolean): Observable<any> {
    return this.objectPostAction(linkId, 'delete_link', {delete_symmetrical: deleteSymmetrical});
  }
}
