import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductSettingsComponent } from './product-settings/product-settings.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    ProductSettingsComponent,
  ],
  exports: [
    ProductSettingsComponent,
  ],
  entryComponents: [
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
  ]
})
export class CpanelModule {
}
