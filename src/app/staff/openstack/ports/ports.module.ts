import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortListComponent } from './port-list/port-list.component';
import { PortCreateComponent } from './port-create/port-create.component';
import { PortEditComponent } from './port-edit/port-edit.component';
import { PortDetailsComponent } from './port-details/port-details.component';
import { PortCreateFormComponent } from './tabs/port-create-form/port-create-form.component';
import { PortDetailsOverviewComponent } from './tabs/port-details-overview/port-details-overview.component';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { PortsRoutingModule } from './ports-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { PortEditFormComponent } from './tabs/port-edit-form/port-edit-form.component';
import { UiModule } from '@shared/ui/ui.module';


@NgModule({
  declarations: [
    PortListComponent,
    PortCreateComponent,
    PortEditComponent,
    PortDetailsComponent,
    PortCreateFormComponent,
    PortDetailsOverviewComponent,
    PortEditFormComponent,
  ],
    imports: [
        CommonModule,
        PortsRoutingModule,
        ObjectsViewModule,
        FlexLayoutModule,
        ErrorHandlingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatSelectModule,
        UiModule,
    ]
})
export class PortsModule {
}
