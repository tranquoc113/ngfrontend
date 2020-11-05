import { Component, OnInit } from '@angular/core';
import { ClientsPanelComponent } from './clients-panel/clients-panel.component';
import { InvoicesPanelComponent } from './invoices-panel/invoices-panel.component';
import { OperatingSystemsPanelComponent } from './operating-systems-panel/operating-systems-panel.component';
import { FlavorsPanelComponent } from './flavors-panel/flavors-panel.component';
import { AppServicesStatusPanelComponent } from './app-services-status-panel/app-services-status-panel.component';
import { InstancesPanelComponent } from './instances-panel/instances-panel.component';
import { HypervisorsPanelComponent } from './hypervisors-panel/hypervisors-panel.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  widgetComponentByTitle = {
    Hypervisors: HypervisorsPanelComponent,
    Flavors: FlavorsPanelComponent,
    Instances: InstancesPanelComponent,
    Clients: ClientsPanelComponent,
    Invoices: InvoicesPanelComponent,
    'App services': AppServicesStatusPanelComponent,
    'Operating systems': OperatingSystemsPanelComponent,
  }
  widgetConfigByTitle = {
    Hypervisors: {
      title: 'Hypervisors',
      component: HypervisorsPanelComponent,
      cols: 33,
      rows: 27,
      resizeEnabled: false,
      y: 0,
      x: 33,
      hasReload: true,
      addPaddingLeftRight: true,
      feature: 'openstack',
    },
    Flavors: {
      title: 'Flavors',
      component: FlavorsPanelComponent,
      cols: 33,
      rows: 23,
      y: 23,
      resizeEnabled: false,
      x: 0,
      hasReload: true,
      addPaddingLeftRight: true,
      feature: 'openstack.flavors',
    },
    Instances: {
      title: 'Instances',
      component: InstancesPanelComponent,
      cols: 33,
      rows: 24,
      resizeEnabled: false,
      y: 27,
      x: 33,
      hasReload: true,
      addPaddingLeftRight: true,
      feature: 'openstack.instances',
    },
    Clients: {
      title: 'Clients',
      component: ClientsPanelComponent,
      cols: 33,
      rows: 13,
      y: 25,
      resizeEnabled: false,
      x: 66,
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
      y: 38,
      x: 66,
      hasReload: true,
      addPaddingLeftRight: true,
      feature: 'billing.invoices',
    },
    'App services': {
      title: 'App services',
      component: AppServicesStatusPanelComponent,
      cols: 33,
      rows: 25,
      resizeEnabled: false,
      y: 0,
      x: 66,
      hasReload: true,
      addPaddingLeftRight: true,
      feature: 'core',
    },
    'Operating systems': {
      title: 'Operating systems',
      component: OperatingSystemsPanelComponent,
      cols: 33,
      rows: 23,
      y: 0,
      resizeEnabled: false,
      x: 0,
      hasReload: true,
      addPaddingLeftRight: true,
      feature: 'openstack',
    },
  }

  ngOnInit() {
  }

}
