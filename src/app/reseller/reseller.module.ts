import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResellerRoutingModule } from './reseller-routing.module';
import { ResellerComponent } from './reseller/reseller.component';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiModule } from '../shared/ui/ui.module';
import { LayoutModule } from '../shared/layout/layout.module';

@NgModule({
  declarations: [
    ResellerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ResellerRoutingModule,
    FlexLayoutModule,
    UiModule,
    LayoutModule,
  ],
  bootstrap: [ResellerComponent],
})
export class ResellerModule { }
