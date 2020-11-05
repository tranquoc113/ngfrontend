import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../shared/ui/ui.module';
import { PluginsRoutingModule } from './plugins-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiModule,
    PluginsRoutingModule,
  ]
})
export class PluginsModule {
}
