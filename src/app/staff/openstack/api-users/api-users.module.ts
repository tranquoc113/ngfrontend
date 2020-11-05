import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiUserListComponent } from './api-user-list/api-user-list.component';
import { ApiUserCreateComponent } from './api-user-create/api-user-create.component';
import { ApiUserEditComponent } from './api-user-edit/api-user-edit.component';
import { ApiUserDetailsComponent } from './api-user-details/api-user-details.component';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { ApiUsersRoutingModule } from './api-users-routing.module';


@NgModule({
  declarations: [
    ApiUserListComponent,
    ApiUserCreateComponent,
    ApiUserEditComponent,
    ApiUserDetailsComponent,
  ],
  imports: [
    CommonModule,
    ObjectsViewModule,
    ApiUsersRoutingModule,
  ]
})
export class ApiUsersModule {
}
