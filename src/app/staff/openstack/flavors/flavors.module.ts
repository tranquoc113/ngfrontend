import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlavorCreateComponent } from './flavor-create/flavor-create.component';
import { FlavorDetailsComponent } from './flavor-details/flavor-details.component';
import { FlavorEditComponent } from './flavor-edit/flavor-edit.component';
import { FlavorListComponent } from './flavor-list/flavor-list.component';
import { FlavorsRoutingModule } from './flavors-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ShowToClientGroupsComponent } from './show-to-client-groups/show-to-client-groups.component';


@NgModule({
  declarations: [
    FlavorCreateComponent,
    FlavorDetailsComponent,
    FlavorEditComponent,
    FlavorListComponent,
    ShowToClientGroupsComponent,
  ],
  imports: [
    CommonModule,
    FlavorsRoutingModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    ObjectsViewModule,
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
  ]
})
export class FlavorsModule {
}
