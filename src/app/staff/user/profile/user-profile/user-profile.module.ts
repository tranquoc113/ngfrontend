import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { ObjectsViewModule } from '../../../../shared/ui/objects-view/objects-view.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '../../../../shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexModule } from '@angular/flex-layout';
import { UiModule } from '../../../../shared/ui/ui.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileDetailsComponent } from './user-profile-details/user-profile-details.component';

@NgModule({
  declarations: [
    UserProfileEditComponent,
    UserProfileDetailsComponent,
  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ObjectsViewModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    MatFormFieldModule,
    MatInputModule,
    FlexModule,
    UiModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class UserProfileModule { }
