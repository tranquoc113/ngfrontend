import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactDetailsOverviewComponent } from './tabs/contact-details-overview/contact-details-overview.component';
import { ContactEditFormComponent } from './tabs/contact-edit-form/contact-edit-form.component';
import { ObjectsViewModule } from '../../../../shared/ui/objects-view/objects-view.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorHandlingModule } from '../../../../shared/error-handling/error-handling.module';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { FleioDataControlsModule } from '../../../../shared/fleio-data-controls/fleio-data-controls.module';
import { UiModule } from '@shared/ui/ui.module';

@NgModule({
  declarations: [
    ContactListComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    ContactCreateComponent,
    ContactDetailsOverviewComponent,
    ContactEditFormComponent,
  ],
    imports: [
        CommonModule,
        ContactsRoutingModule,
        ObjectsViewModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        ErrorHandlingModule,
        MatInputModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatSelectModule,
        FlexLayoutModule,
        MatDividerModule,
        FleioDataControlsModule,
        UiModule,
    ]
})
export class ContactsModule {
}
