import { Component, OnInit } from '@angular/core';
import { ListBase } from '../../../../shared/ui/objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '../../../../shared/ui-api/refresh.service';
import { IJournalEntryModel } from '../../../../shared/fleio-api/billing/model/journal-entry.model';
import { JournalListUiService } from '../journal-list-ui.service';

@Component({
  selector: 'app-journal-list',
  templateUrl: './journal-list.component.html',
  styleUrls: ['./journal-list.component.scss']
})
export class JournalListComponent extends ListBase<IJournalEntryModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private journalListUiService: JournalListUiService,
    private refreshService: RefreshService,
  ) {
    super(route, journalListUiService, refreshService, 'journalEntries');
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
