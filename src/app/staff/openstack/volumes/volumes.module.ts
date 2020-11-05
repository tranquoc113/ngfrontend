import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeListComponent } from './volume-list/volume-list.component';
import { VolumeDetailsComponent } from './volume-details/volume-details.component';
import { VolumeCreateComponent } from './volume-create/volume-create.component';
import { VolumeEditComponent } from './volume-edit/volume-edit.component';
import { VolumesRoutingModule } from './volume-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { VolumeDetailsBackupsComponent } from './tabs/volume-details-backups/volume-details-backups.component';
import { VolumeDetailsSnapshotsComponent } from './tabs/volume-details-snapshots/volume-details-snapshots.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { EditVolumeBootableStatusDialogComponent } from './dialogs/edit-volume-bootable-status-dialog/edit-volume-bootable-status-dialog.component';
import { UiModule } from '@shared/ui/ui.module';
import { RevertVolumeToSnapshotDialogComponent } from './dialogs/revert-volume-to-snapshot-dialog/revert-volume-to-snapshot-dialog.component';


@NgModule({
  declarations: [
    VolumeListComponent,
    VolumeDetailsComponent,
    VolumeCreateComponent,
    VolumeEditComponent,
    VolumeDetailsBackupsComponent,
    VolumeDetailsSnapshotsComponent,
    EditVolumeBootableStatusDialogComponent,
    RevertVolumeToSnapshotDialogComponent,
  ],
  imports: [
    CommonModule,
    VolumesRoutingModule,
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
export class VolumesModule {
}
