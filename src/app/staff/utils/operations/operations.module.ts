import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { OperationsListComponent } from './operations-list/operations-list.component';
import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsDetailsComponent } from './operations-details/operations-details.component';
import { OperationDetailsOverviewComponent } from './tabs/operation-details-overview/operation-details-overview.component';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    OperationsListComponent,
    OperationsDetailsComponent,
    OperationDetailsOverviewComponent,
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    ObjectsViewModule,
    FlexModule,
    MatIconModule,
  ]
})
export class OperationsModule { }
