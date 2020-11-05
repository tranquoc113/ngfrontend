import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormErrorsComponent } from './form-errors/form-errors.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DisconnectedFromServerComponent } from './disconnected-from-server/disconnected-from-server.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    FormErrorsComponent,
    DisconnectedFromServerComponent,
  ],
  exports: [
    FormErrorsComponent,
    PageNotFoundComponent,
    DisconnectedFromServerComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    UiModule,
  ]
})
export class ErrorHandlingModule { }
