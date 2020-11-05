import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { TodoDetailsOverviewComponent } from './tabs/todo-details-overview/todo-details-overview.component';
import { TodoEditFormComponent } from './tabs/todo-edit-form/todo-edit-form.component';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UiModule } from '../../../shared/ui/ui.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TodoPluginNotificationsComponent } from './todo-plugin-notifications/todo-plugin-notifications.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { ProductSettingsComponent } from './product-settings/product-settings.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    TodoListComponent,
    TodoCreateComponent,
    TodoEditComponent,
    TodoDetailsComponent,
    TodoDetailsOverviewComponent,
    TodoEditFormComponent,
    TodoPluginNotificationsComponent,
    ProductSettingsComponent,
  ],
  exports: [
    TodoDetailsOverviewComponent,
    TodoEditFormComponent,
    TodoPluginNotificationsComponent,
    ProductSettingsComponent,
  ],
  imports: [
    CommonModule,
    ObjectsViewModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    ErrorHandlingModule,
    MatSelectModule,
    MatAutocompleteModule,
    UiModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    RouterModule,
    MatMenuModule,
    MatCheckboxModule,
  ]
})
export class TodoModule {
}
