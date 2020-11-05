import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { ImageCreateComponent } from './image-create/image-create.component';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { ImagesRoutingModule } from './images-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { ImageEditPropertiesFormComponent } from './tabs/image-edit-properties-form/image-edit-properties-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageDetailsFlavorsAssignmentComponent } from './tabs/image-details-flavors-assignment/image-details-flavors-assignment.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { UiModule } from '@shared/ui/ui.module';


@NgModule({
  declarations: [
    ImageListComponent,
    ImageEditComponent,
    ImageCreateComponent,
    ImageDetailsComponent,
    ImageEditPropertiesFormComponent,
    ImageDetailsFlavorsAssignmentComponent,
  ],
    imports: [
        CommonModule,
        ImagesRoutingModule,
        ObjectsViewModule,
        ReactiveFormsModule,
        ErrorHandlingModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        MatTableModule,
        UiModule,
    ]
})
export class ImagesModule {
}
