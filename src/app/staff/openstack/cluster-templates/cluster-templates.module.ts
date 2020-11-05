import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClusterTemplatesRoutingModule } from './cluster-templates-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClusterTemplateListComponent } from './cluster-template-list/cluster-template-list.component';
import { ClusterTemplateCreateComponent } from './cluster-template-create/cluster-template-create.component';
import { ClusterTemplateDetailsComponent } from './cluster-template-details/cluster-template-details.component';
import { ClusterDetailsAssignedFlavorsComponent } from './tabs/cluster-details-assigned-flavors/cluster-details-assigned-flavors.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ClusterTemplateListComponent,
    ClusterTemplateCreateComponent,
    ClusterTemplateDetailsComponent,
    ClusterDetailsAssignedFlavorsComponent,
  ],
  imports: [
    CommonModule,
    ClusterTemplatesRoutingModule,
    ObjectsViewModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    ErrorHandlingModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ]
})
export class ClusterTemplatesModule {
}
