import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServicesRoutingModule } from './services-routing.module';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ServiceListUIService } from './service-list-ui.service';
import { ServiceChangeOptionsComponent } from './service-change-options/service-change-options.component';
import { ServiceChangeProductComponent } from './service-change-product/service-change-product.component';
import { ServiceChangeOptionsFormComponent } from './tabs/service-change-options-form/service-change-options-form.component';
import { ServiceChangeProductFormComponent } from './tabs/service-change-product-form/service-change-product-form.component';
import { ConfigurableOptionInputComponent } from './components/configurable-option-input/configurable-option-input.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    ServiceDetailsComponent,
    ServiceEditComponent,
    ServiceListComponent,
    ServiceChangeOptionsComponent,
    ServiceChangeProductComponent,
    ServiceChangeOptionsFormComponent,
    ServiceChangeProductFormComponent,
    ConfigurableOptionInputComponent,
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    ErrorHandlingModule,
    MatDialogModule,
    ReactiveFormsModule,
    ObjectsViewModule,
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  providers: [
    {
      provide: ServiceListUIService,
      useClass: ServiceListUIService,
      multi: false,
    },
  ]
})
export class ServicesModule {
}
