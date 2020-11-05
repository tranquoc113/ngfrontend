import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientGroupCreateComponent } from './client-group-create/client-group-create.component';
import { ClientGroupDetailsComponent } from './client-group-details/client-group-details.component';
import { ClientGroupEditComponent } from './client-group-edit/client-group-edit.component';
import { ClientGroupListComponent } from './client-group-list/client-group-list.component';
import { ClientGroupsRoutingModule } from './client-groups-routing.module';
import { ClientGroupDetailsOverviewComponent } from './tabs/client-group-details-overview/client-group-details-overview.component';
import { ClientGroupEditFormComponent } from './tabs/client-group-edit-form/client-group-edit-form.component';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UiModule } from '@shared/ui/ui.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    ClientGroupCreateComponent,
    ClientGroupDetailsComponent,
    ClientGroupEditComponent,
    ClientGroupListComponent,
    ClientGroupDetailsOverviewComponent,
    ClientGroupEditFormComponent,
  ],
  imports: [
    CommonModule,
    ClientGroupsRoutingModule,
    ObjectsViewModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    UiModule,
    MatTableModule,
    MatButtonModule,
    MatAutocompleteModule,
  ]
})
export class ClientGroupsModule {
}
