import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectsViewModule } from '../../../../shared/ui/objects-view/objects-view.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiModule } from '../../../../shared/ui/ui.module';
import { DepartmentsListComponent } from './departments-list/departments-list.component';
import { DepartmentsCreateComponent } from './departments-create/departments-create.component';
import { DepartmentEditFormComponent } from './tabs/department-edit-form/department-edit-form.component';
import { ErrorHandlingModule } from '../../../../shared/error-handling/error-handling.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { DepartmentDetailsComponent } from './department-details/department-details.component';


@NgModule({
  declarations: [
    DepartmentsListComponent,
    DepartmentsCreateComponent,
    DepartmentEditFormComponent,
    DepartmentDetailsComponent
  ],
  entryComponents: [
  ],
  exports: [
    DepartmentEditFormComponent
  ],
  imports: [
    CommonModule,
    ObjectsViewModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UiModule,
    ErrorHandlingModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ]
})
export class DepartmentsModule {
}
