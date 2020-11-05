import { Injectable } from '@angular/core';
import { ConfigService } from '../../../config/config.service';
import { FleioApiService } from '../../fleio-api.service';
import { HttpClient } from '@angular/common/http';
import { IJournalEntryModel } from '../model/journal-entry.model';


@Injectable({
  providedIn: 'root'
})
export class JournalsApiService extends FleioApiService<IJournalEntryModel> {
  // noinspection JSUnusedGlobalSymbols
  constructor(protected httpClient: HttpClient, protected config: ConfigService) {
    super();
    this.setEndpoint(config.getPanelApiUrl('billing/journal'));
  }
}
