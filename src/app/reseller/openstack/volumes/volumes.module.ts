import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolumeCreateComponent } from './volume-create/volume-create.component';
import { VolumeDetailsComponent } from './volume-details/volume-details.component';
import { VolumeEditComponent } from './volume-edit/volume-edit.component';
import { VolumeListComponent } from './volume-list/volume-list.component';
import { VolumesRoutingModule } from './volume-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { VolumeListUIService } from './volume-list-ui.service';
import { UiModule } from '@shared/ui/ui.module';
import { CommonTabsModule } from '@shared/common-tabs/common-tabs.module';
import { CommonDialogsModule } from '@shared/common-dialogs/common-dialogs.module';


@NgModule({
  declarations: [
    VolumeCreateComponent,
    VolumeDetailsComponent,
    VolumeEditComponent,
    VolumeListComponent,
  ],
  imports: [
    CommonModule,
    VolumesRoutingModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    ObjectsViewModule,
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatButtonModule,
    UiModule,
    CommonTabsModule,
    CommonDialogsModule,
  ],
  providers: [
    {
      provide: VolumeListUIService,
      useClass: VolumeListUIService,
      multi: false,
    },
  ]
})
export class VolumesModule {
}
