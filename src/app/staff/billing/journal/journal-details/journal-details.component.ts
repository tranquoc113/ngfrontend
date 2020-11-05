import { Component } from '@angular/core';
import { DetailsBase } from '../../../../shared/ui/objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { JournalListUiService } from '../journal-list-ui.service';
import { IJournalEntryModel } from '../../../../shared/fleio-api/billing/model/journal-entry.model';

@Component({
  selector: 'app-journal-details',
  templateUrl: './journal-details.component.html',
  styleUrls: ['./journal-details.component.scss']
})
export class JournalDetailsComponent extends DetailsBase<IJournalEntryModel> {
  constructor(route: ActivatedRoute, journalListUiService: JournalListUiService) {
    super(route, journalListUiService, 'details', 'journalEntry');
  }
}
