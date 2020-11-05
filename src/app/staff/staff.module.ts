import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiModule } from '../shared/ui/ui.module';
import { StaffComponent } from './staff/staff.component';
import { ErrorHandlingModule } from '../shared/error-handling/error-handling.module';
import { LayoutModule } from '../shared/layout/layout.module';

@NgModule({
  declarations: [
    StaffComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StaffRoutingModule,
    FlexLayoutModule,
    UiModule,
    ErrorHandlingModule,
    LayoutModule,
  ],
  bootstrap: [StaffComponent],
})
export class StaffModule { }
