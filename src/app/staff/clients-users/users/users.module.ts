import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersRoutingModule } from './users-routing.module';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { UserImpersonateComponent } from './user-impersonate/user-impersonate.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserEditComponent,
    UserImpersonateComponent,
  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ObjectsViewModule,
    ErrorHandlingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatTableModule,
  ]
})
export class UsersModule { }
