import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationTemplateListComponent } from './notification-template-list/notification-template-list.component';
import { NotificationTemplatesRoutingModule } from './notification-templates-routing.module';
import { NotificationTemplateCreateComponent } from './notification-template-create/notification-template-create.component';
import { NotificationTemplateDetailsComponent } from './notification-template-details/notification-template-details.component';
import { NotificationTemplateEditComponent } from './notification-template-edit/notification-template-edit.component';
import { NotificationTemplateEditFormComponent } from './tabs/notification-template-edit-form/notification-template-edit-form.component';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AddNewTemplateDialogComponent } from './dialogs/add-new-template-dialog/add-new-template-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { UiModule } from '@shared/ui/ui.module';


@NgModule({
  declarations: [
    NotificationTemplateListComponent,
    NotificationTemplateCreateComponent,
    NotificationTemplateDetailsComponent,
    NotificationTemplateEditComponent,
    NotificationTemplateEditFormComponent,
    AddNewTemplateDialogComponent,
  ],
    imports: [
        CommonModule,
        NotificationTemplatesRoutingModule,
        ObjectsViewModule,
        ErrorHandlingModule,
        FlexModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        EditorModule,
        MatDialogModule,
        MatSelectModule,
        UiModule,
    ],
  exports: [
    NotificationTemplateEditFormComponent,
    AddNewTemplateDialogComponent,
  ],
})
export class NotificationTemplatesModule {
}
