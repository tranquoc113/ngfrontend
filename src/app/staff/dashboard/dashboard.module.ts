import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { GridsterModule } from 'angular-gridster2';
import { MatButtonModule } from '@angular/material/button';
import { ClientsPanelComponent } from './dashboard/clients-panel/clients-panel.component';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { MatTableModule } from '@angular/material/table';
import { FlexModule } from '@angular/flex-layout';
import { InvoicesPanelComponent } from './dashboard/invoices-panel/invoices-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { OperatingSystemsPanelComponent } from './dashboard/operating-systems-panel/operating-systems-panel.component';
import { FlavorsPanelComponent } from './dashboard/flavors-panel/flavors-panel.component';
import { MatMenuModule } from '@angular/material/menu';
import { AppServicesStatusPanelComponent } from './dashboard/app-services-status-panel/app-services-status-panel.component';
import { InstancesPanelComponent } from './dashboard/instances-panel/instances-panel.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HypervisorsPanelComponent } from './dashboard/hypervisors-panel/hypervisors-panel.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonTabsModule } from '@shared/common-tabs/common-tabs.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ClientsPanelComponent,
    InvoicesPanelComponent,
    OperatingSystemsPanelComponent,
    FlavorsPanelComponent,
    AppServicesStatusPanelComponent,
    InstancesPanelComponent,
    HypervisorsPanelComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    GridsterModule,
    MatButtonModule,
    MatIconModule,
    ObjectsViewModule,
    MatTableModule,
    FlexModule,
    MatMenuModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    CommonTabsModule
  ],
})
export class DashboardModule { }
