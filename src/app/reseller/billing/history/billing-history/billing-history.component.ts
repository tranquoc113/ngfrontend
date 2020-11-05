import { Component, OnInit } from '@angular/core';
import { IDetailsData } from '../../../../shared/ui/objects-view/interfaces/details/details-data';
import { BillingHistoryOverviewComponent } from '../tabs/billing-history-overview/billing-history-overview.component';

@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrls: ['./billing-history.component.scss']
})
export class BillingHistoryComponent implements OnInit {
  detailsData: IDetailsData = {
    header: {
      title: {
        text: 'Billing history',
      }
    },
    tabs: [{
      tabName: 'Overview',
      component: BillingHistoryOverviewComponent,
    }],
  };

  constructor() { }

  ngOnInit() {
  }

}
