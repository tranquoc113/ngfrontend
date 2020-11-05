import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerGroupListComponent } from './server-group-list/server-group-list.component';
import { ServerGroupEditComponent } from './server-group-edit/server-group-edit.component';
import { ServerGroupCreateComponent } from './server-group-create/server-group-create.component';
import { ServerGroupsRoutingModule } from './server-groups-routing.module';
import { ServerGroupEditFormComponent } from './tabs/server-group-edit-form/server-group-edit-form.component';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { UiModule } from '@shared/ui/ui.module';

@NgModule({
  declarations: [ServerGroupListComponent, ServerGroupEditComponent, ServerGroupCreateComponent, ServerGroupEditFormComponent],
    imports: [
        CommonModule,
        ServerGroupsRoutingModule,
        ObjectsViewModule,
        ErrorHandlingModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        UiModule,
    ]
})
export class ServerGroupsModule { }
