import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoDialogComponent } from './yes-no-dialog/yes-no-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [YesNoDialogComponent],
  entryComponents: [YesNoDialogComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
  ]
})
export class UiApiModule { }
