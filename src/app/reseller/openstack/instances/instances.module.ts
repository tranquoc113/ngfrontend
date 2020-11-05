import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstanceListComponent } from './instance-list/instance-list.component';
import { InstancesRoutingModule } from './instances-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { InstanceDetailsComponent } from './instance-details/instance-details.component';
import { InstanceRescueComponent } from './instance-rescue/instance-rescue.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InstanceCreateComponent } from './instance-create/instance-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UiModule } from '@shared/ui/ui.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InstanceResizeComponent } from './instance-resize/instance-resize.component';
import { FleioDataControlsModule } from '@shared/fleio-data-controls/fleio-data-controls.module';
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
    MatCardModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    UiModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatTooltipModule,
    FleioDataControlsModule,
  ],
})
export class InstancesModule { }
