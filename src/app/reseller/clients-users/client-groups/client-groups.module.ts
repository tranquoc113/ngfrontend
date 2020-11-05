import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientGroupDetailsComponent } from './client-group-details/client-group-details.component';
import { ClientGroupsRoutingModule } from './client-groups-routing.module';
import { ClientGroupDetailsOverviewComponent } from './tabs/client-group-details-overview/client-group-details-overview.component';
import { ClientGroupListComponent } from './client-group-list/client-group-list.component';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { ClientGroupCreateComponent } from './client-group-create/client-group-create.component';
import { ClientGroupEditComponent } from './client-group-edit/client-group-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ClientGroupEditFormComponent } from './tabs/client-group-edit-form/client-group-edit-form.component';


@NgModule({
  declarations: [
    ClientGroupDetailsComponent,
    ClientGroupDetailsOverviewComponent,
    ClientGroupListComponent,
    ClientGroupCreateComponent,
    ClientGroupEditComponent,
    ClientGroupEditFormComponent
  ],
  entryComponents: [
    ClientGroupDetailsOverviewComponent,
    ClientGroupEditFormComponent
  ],
  imports: [
    CommonModule,
    ClientGroupsRoutingModule,
    ObjectsViewModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
  ]
})
export class ClientGroupsModule { }
