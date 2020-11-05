import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarListComponent } from './registrar-list/registrar-list.component';
import { RegistrarCreateComponent } from './registrar-create/registrar-create.component';
import { RegistrarEditComponent } from './registrar-edit/registrar-edit.component';
import { RegistrarDetailsComponent } from './registrar-details/registrar-details.component';
import { RegistrarsRoutingModule } from './registrars-routing.module';
import { RegistrarDetailsOverviewComponent } from './tabs/registrar-details-overview/registrar-details-overview.component';
import { RegistrarEditFormComponent } from './tabs/registrar-edit-form/registrar-edit-form.component';
import { ObjectsViewModule } from '../../../../shared/ui/objects-view/objects-view.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '../../../../shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UiModule } from '@shared/ui/ui.module';


@NgModule({
  declarations: [RegistrarListComponent, RegistrarCreateComponent, RegistrarEditComponent, RegistrarDetailsComponent, RegistrarDetailsOverviewComponent, RegistrarEditFormComponent],
    imports: [
        CommonModule,
        RegistrarsRoutingModule,
        ObjectsViewModule,
        ReactiveFormsModule,
        ErrorHandlingModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatInputModule,
        MatAutocompleteModule,
        UiModule,
    ]
})
export class RegistrarsModule {
}
