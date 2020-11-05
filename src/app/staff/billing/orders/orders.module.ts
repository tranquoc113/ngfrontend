import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { CommonTabsModule } from '@shared/common-tabs/common-tabs.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    CommonTabsModule,
    RouterModule,
    ObjectsViewModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTableModule,
  ]
})
export class OrdersModule {
}
