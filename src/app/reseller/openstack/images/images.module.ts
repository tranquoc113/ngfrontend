import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCreateComponent } from './image-create/image-create.component';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { ImageListComponent } from './image-list/image-list.component';
import { ImagesRoutingModule } from './images-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    ImageCreateComponent,
    ImageDetailsComponent,
    ImageEditComponent,
    ImageListComponent,
  ],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    ObjectsViewModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressBarModule,
  ]
})
export class ImagesModule {
}
