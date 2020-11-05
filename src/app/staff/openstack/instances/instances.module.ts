import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstanceListComponent } from './instance-list/instance-list.component';
import { InstancesRoutingModule } from './instances-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { InstanceDetailsComponent } from './instance-details/instance-details.component';
import { InstanceRescueComponent } from './instance-rescue/instance-rescue.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InstanceCreateComponent } from './instance-create/instance-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UiModule } from '@shared/ui/ui.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { InstanceResizeComponent } from './instance-resize/instance-resize.component';
import { InstanceRebuildComponent } from './instance-rebuild/instance-rebuild.component';
import { InstanceBootFromIsoComponent } from './instance-boot-from-iso/instance-boot-from-iso.component';


@NgModule({
  declarations: [
    InstanceListComponent,
    InstanceDetailsComponent,
    InstanceRescueComponent,
    InstanceCreateComponent,
    InstanceResizeComponent,
    InstanceRebuildComponent,
    InstanceBootFromIsoComponent,
  ],
  imports: [
    CommonModule,
    InstancesRoutingModule,
    ObjectsViewModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatIconModule,
    UiModule,
  ]
})
export class InstancesModule { }
