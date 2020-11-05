import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectEditFormComponent } from './tabs/project-edit-form/project-edit-form.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UiModule } from '@shared/ui/ui.module';


@NgModule({
  declarations: [
    ProjectCreateComponent,
    ProjectEditComponent,
    ProjectListComponent,
    ProjectEditFormComponent,
  ],
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        ObjectsViewModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        ErrorHandlingModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        UiModule,
    ]
})
export class ProjectsModule {
}
