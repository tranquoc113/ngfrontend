import { Component, OnInit } from '@angular/core';
import { ClientsPanelComponent } from './clients-panel/clients-panel.component';
import { InvoicesPanelComponent } from './invoices-panel/invoices-panel.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  widgetComponentByTitle = {
    Clients: ClientsPanelComponent,
    Invoices: InvoicesPanelComponent,
  }
  widgetConfigByTitle = {
    Clients: {
      title: 'Clients',
      component: ClientsPanelComponent,
      cols: 33,
      rows: 13,
      y: 0,
      resizeEnabled: false,
      x: 0,
      hasReload: true,
      addPaddingLeftRight: true,
      feature: 'clients&users.clients',
    },
    Invoices: {
      title: 'Invoices',
      component: InvoicesPanelComponent,
      cols: 33,
      rows: 18,
      resizeEnabled: false,
      y: 0,
      x: 33,
      hasReload: true,
      addPaddingLeftRight: true,
      feature: 'billing.invoices',
    },
  }

  ngOnInit() {
  }

}
