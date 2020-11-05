import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonTabsModule } from '@shared/common-tabs/common-tabs.module';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    CommonTabsModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    ObjectsViewModule,
    FlexLayoutModule,
  ]
})
export class OrdersModule {
}
