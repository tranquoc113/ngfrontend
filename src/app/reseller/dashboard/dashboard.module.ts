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
import { CommonTabsModule } from '@shared/common-tabs/common-tabs.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ClientsPanelComponent,
    InvoicesPanelComponent
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
    CommonTabsModule
  ],
  entryComponents: [
    ClientsPanelComponent,
    InvoicesPanelComponent,
  ]
})
export class DashboardModule { }
