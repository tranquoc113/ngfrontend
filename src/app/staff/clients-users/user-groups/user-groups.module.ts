import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGroupCreateComponent } from './user-group-create/user-group-create.component';
import { UserGroupDetailsComponent } from './user-group-details/user-group-details.component';
import { UserGroupEditComponent } from './user-group-edit/user-group-edit.component';
import { UserGroupListComponent } from './user-group-list/user-group-list.component';
import { UserGroupsRoutingModule } from './user-groups-routing.module';
import { UserGroupDetailsOverviewComponent } from './tabs/user-group-details-overview/user-group-details-overview.component';
import { UserGroupEditFormComponent } from './tabs/user-group-edit-form/user-group-edit-form.component';
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
    UserGroupCreateComponent,
    UserGroupDetailsComponent,
    UserGroupEditComponent,
    UserGroupListComponent,
    UserGroupDetailsOverviewComponent,
    UserGroupEditFormComponent,
  ],
  imports: [
    CommonModule,
    UserGroupsRoutingModule,
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
export class UserGroupsModule {
}
