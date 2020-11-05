import { Component } from '@angular/core';
import { DetailsComponentBase } from '../../../../ui/objects-view/details-component-base';
import { JournalsApiService } from '../../../../fleio-api/billing/journal/journal-api.service';
import { IJournalEntryModel } from '../../../../fleio-api/billing/model/journal-entry.model';
import { ConfigService } from '../../../../config/config.service';

@Component({
  selector: 'app-journal-details-overview',
  templateUrl: './journal-details-overview.component.html',
  styleUrls: ['./journal-details-overview.component.scss']
})
export class JournalDetailsOverviewComponent extends DetailsComponentBase<IJournalEntryModel> {
  constructor(
    private journalsApiService: JournalsApiService,
    public config: ConfigService
  ) {
    super();
  }

  protected refreshData() {
    this.journalsApiService.get(this.object.id).subscribe(result => {
      this.objectController.object = result;
    });
  }

}
