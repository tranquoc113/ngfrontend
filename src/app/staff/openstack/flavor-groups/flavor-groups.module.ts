import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlavorGroupListComponent } from './flavor-group-list/flavor-group-list.component';
import { FlavorGroupCreateComponent } from './flavor-group-create/flavor-group-create.component';
import { FlavorGroupEditComponent } from './flavor-group-edit/flavor-group-edit.component';
import { FlavorGroupDetailsComponent } from './flavor-group-details/flavor-group-details.component';
import { FlavorGroupDetailsOverviewComponent } from './tabs/flavor-group-details-overview/flavor-group-details-overview.component';
import { FlavorGroupEditFormComponent } from './tabs/flavor-group-edit-form/flavor-group-edit-form.component';
import { FlavorGroupsRoutingModule } from './flavor-groups-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { UiModule } from '@shared/ui/ui.module';



@NgModule({
  declarations: [
    FlavorGroupListComponent,
    FlavorGroupCreateComponent,
    FlavorGroupEditComponent,
    FlavorGroupDetailsComponent,
    FlavorGroupDetailsOverviewComponent,
    FlavorGroupEditFormComponent,
  ],
    imports: [
        CommonModule,
        FlavorGroupsRoutingModule,
        ObjectsViewModule,
        ReactiveFormsModule,
        ErrorHandlingModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        FlexLayoutModule,
        MatTableModule,
        MatAutocompleteModule,
        MatButtonModule,
        UiModule,
    ]
})
export class FlavorGroupsModule { }
