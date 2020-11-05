import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenstackPluginConfigurationComponent } from './openstack-plugin-configuration/openstack-plugin-configuration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { ProductSettingsComponent } from './product-settings/product-settings.component';
import { MatSelectModule } from '@angular/material/select';
import { UiModule } from '@shared/ui/ui.module';


@NgModule({
  declarations: [
    OpenstackPluginConfigurationComponent,
    ProductSettingsComponent,
  ],
  exports: [
    OpenstackPluginConfigurationComponent,
    ProductSettingsComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatFormFieldModule,
        FlexModule,
        MatInputModule,
        MatCheckboxModule,
        RouterModule,
        ErrorHandlingModule,
        MatSelectModule,
        UiModule,
    ]
})
export class OpenstackModule {
}
