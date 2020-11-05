import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductSettingsComponent } from './product-settings/product-settings.component';


@NgModule({
  declarations: [
    ProductSettingsComponent,
  ],
  exports: [
    ProductSettingsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    FlexModule,
    MatInputModule,
    MatCheckboxModule,
    RouterModule,
    ErrorHandlingModule,
  ]
})
export class CpanelserverModule {
}
