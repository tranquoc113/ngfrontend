import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FleioApiService } from '../../fleio-api.service';
import { ConfigService } from '@shared/config/config.service';
import { Observable } from 'rxjs';
import { ITicketSignatureModel } from '@fleio-api/plugins/tickets/model/ticket-signature.model';


@Injectable({
  providedIn: 'root'
})
export class TicketsSignaturesApiService extends FleioApiService<ITicketSignatureModel> {
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('plugins/tickets/staff_signatures'));
  }

  getSignaturesForCurrentUser(): Observable<ITicketSignatureModel> {
    return this.getAction( 'get_signatures_for_current_user');
  }

  addGlobalSignature() {
    return this.postAction('add_global_signature');
  }

  saveSignatures(data: {objects: Array<ITicketSignatureModel>}) {
    return this.postAction('save_signatures', data);
  }

}
