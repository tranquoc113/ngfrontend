import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { InvoiceCreateComponent } from './invoice-create/invoice-create.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoiceDetailsComponent,
    InvoiceCreateComponent,
    InvoiceEditComponent,
  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    ObjectsViewModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTableModule,
  ]
})
export class InvoicesModule { }
