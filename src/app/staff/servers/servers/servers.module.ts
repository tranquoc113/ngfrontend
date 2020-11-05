import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerListComponent } from './server-list/server-list.component';
import { ServerEditComponent } from './server-edit/server-edit.component';
import { ServerCreateComponent } from './server-create/server-create.component';
import { ServersRoutingModule } from './servers-routing.module';
import { ServerEditFormComponent } from './tabs/server-edit-form/server-edit-form.component';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PluginsModule } from '../../../shared/plugins/plugins.module';
import { UiModule } from '@shared/ui/ui.module';

@NgModule({
  declarations: [ServerListComponent, ServerEditComponent, ServerCreateComponent, ServerEditFormComponent],
    imports: [
        CommonModule,
        ServersRoutingModule,
        ObjectsViewModule,
        ReactiveFormsModule,
        ErrorHandlingModule,
        MatFormFieldModule,
        MatSelectModule,
        FlexLayoutModule,
        MatInputModule,
        MatCheckboxModule,
        PluginsModule,
        UiModule,
    ]
})
export class ServersModule { }
