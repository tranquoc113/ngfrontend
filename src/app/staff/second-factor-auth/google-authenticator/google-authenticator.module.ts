import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAuthenticatorRoutingModule } from './google-authenticator-routing.module';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
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
import { GoogleAuthenticatorDetailsComponent } from './google-authenticator-details/google-authenticator-details.component';

@NgModule({
  declarations: [
    GoogleAuthenticatorDetailsComponent,
  ],
  exports: [
    GoogleAuthenticatorDetailsComponent,
  ],
  imports: [
    CommonModule,
    GoogleAuthenticatorRoutingModule,
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
  ]
})
export class GoogleAuthenticatorModule {
}
