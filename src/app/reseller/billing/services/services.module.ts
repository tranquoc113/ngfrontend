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


@NgModule({
  declarations: [
    ServiceDetailsComponent,
    ServiceEditComponent,
    ServiceListComponent,
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
