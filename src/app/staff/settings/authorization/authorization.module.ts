import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { AuthorizationEditComponent } from './authorization-edit/authorization-edit.component';
import { UsersAuthorizationComponent } from './tabs/users-authorization/users-authorization.component';
import { UiModule } from '../../../shared/ui/ui.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { UserGroupsAuthorizationComponent } from './tabs/user-groups-authorization/user-groups-authorization.component';


@NgModule({
  declarations: [
    AuthorizationEditComponent,
    UsersAuthorizationComponent,
    UserGroupsAuthorizationComponent,
  ],
    imports: [
        CommonModule,
        AuthorizationRoutingModule,
        ObjectsViewModule,
        FlexLayoutModule,
        UiModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        ErrorHandlingModule,
        MatCheckboxModule,
        MatButtonModule,
        FormsModule,
    ]
})
export class AuthorizationModule {
}
