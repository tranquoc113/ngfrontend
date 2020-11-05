import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { DetailsComponentBase } from '../../../../ui/objects-view/details-component-base';
import { IClientModel } from '../../../../fleio-api/client-user/model/client.model';
import { ClientsApiService } from '../../../../fleio-api/client-user/client/clients-api.service';
import { ConfigService } from '../../../../config/config.service';
import { IJournalEntryModel } from '../../../../fleio-api/billing/model/journal-entry.model';
import { JournalsApiService } from '../../../../fleio-api/billing/journal/journal-api.service';

@Component({
  selector: 'app-client-details-journal',
  templateUrl: './client-details-journal.component.html',
  styleUrls: ['./client-details-journal.component.scss']
})
export class ClientDetailsJournalComponent extends DetailsComponentBase<IClientModel> implements OnInit {
  journalEntries: IJournalEntryModel[];
  displayedColumns: string[] = ['date', 'source', 'destination', 'amount'];

  constructor(
    private clientsApi: ClientsApiService,
    private journalsApiService: JournalsApiService,
    public config: ConfigService,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setupRefreshTimer(3000);
  }

  protected refreshData() {
    this.journalsApiService.list({
      client_id: this.object.id,
      page_size: 20,
    }).subscribe(journalEntries => {
      this.journalEntries = journalEntries.objects;
    });
  }
}
