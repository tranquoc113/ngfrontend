import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingHistoryComponent } from './billing-history/billing-history.component';
import { HistoryRoutingModule } from './history-routing.module';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { BillingHistoryOverviewComponent } from './tabs/billing-history-overview/billing-history-overview.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { FleioDataControlsModule } from '../../../shared/fleio-data-controls/fleio-data-controls.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BillingHistoryComponent,
    BillingHistoryOverviewComponent,
  ],
  entryComponents: [
    BillingHistoryOverviewComponent,
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    ObjectsViewModule,
    MatExpansionModule,
    MatTableModule,
    MatDividerModule,
    FleioDataControlsModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ]
})
export class HistoryModule { }
