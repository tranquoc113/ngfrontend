import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiUserListComponent } from './api-user-list/api-user-list.component';
import { ApiUserCreateComponent } from './api-user-create/api-user-create.component';
import { ApiUserDetailsComponent } from './api-user-details/api-user-details.component';
import { ApiUserEditComponent } from './api-user-edit/api-user-edit.component';
import { ApiUsersRoutingModule } from './api-users-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ApiUserListUiService } from './api-user-list-ui.service';
import { UiModule } from '@shared/ui/ui.module';

@NgModule({
  declarations: [
    ApiUserListComponent,
    ApiUserCreateComponent,
    ApiUserDetailsComponent,
    ApiUserEditComponent,
  ],
  imports: [
    CommonModule,
    ApiUsersRoutingModule,
    ObjectsViewModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    MatInputModule,
    MatCheckboxModule,
    FlexModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    UiModule,
  ],
  providers: [
    {
      provide: ApiUserListUiService,
      useClass: ApiUserListUiService,
      multi: false,
    },
  ]
})
export class ApiUsersModule { }
