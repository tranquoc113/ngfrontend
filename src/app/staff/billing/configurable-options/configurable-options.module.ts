import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurableOptionListComponent } from './configurable-option-list/configurable-option-list.component';
import { ConfigurableOptionEditComponent } from './configurable-option-edit/configurable-option-edit.component';
import { ConfigurableOptionEditFormComponent } from './tabs/configurable-option-edit-form/configurable-option-edit-form.component';
import { ConfigurableOptionCreateComponent } from './configurable-option-create/configurable-option-create.component';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { ConfigurableOptionsRoutingModule } from './configurable-options-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { EditOptionCycleDialogComponent } from './dialogs/edit-option-cycle-dialog/edit-option-cycle-dialog.component';
import { EditOptionChoiceDialogComponent } from './dialogs/edit-option-choice-dialog/edit-option-choice-dialog.component';
import { UiModule } from '@shared/ui/ui.module';


@NgModule({
  declarations: [
    ConfigurableOptionListComponent,
    ConfigurableOptionEditComponent,
    ConfigurableOptionEditFormComponent,
    ConfigurableOptionCreateComponent,
    EditOptionCycleDialogComponent,
    EditOptionChoiceDialogComponent,
  ],
  exports: [
    EditOptionCycleDialogComponent,
    EditOptionChoiceDialogComponent,
  ],
    imports: [
        CommonModule,
        ConfigurableOptionsRoutingModule,
        ObjectsViewModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        ErrorHandlingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatButtonModule,
        MatDialogModule,
        MatTableModule,
        UiModule
    ]
})
export class ConfigurableOptionsModule {
}
