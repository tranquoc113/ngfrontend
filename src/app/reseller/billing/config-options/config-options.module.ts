import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigOptionCreateComponent } from './config-option-create/config-option-create.component';
import { ConfigOptionEditComponent } from './config-option-edit/config-option-edit.component';
import { ConfigOptionDetailsComponent } from './config-option-details/config-option-details.component';
import { ConfigOptionListComponent } from './config-option-list/config-option-list.component';
import { ConfigOptionsRoutingModule } from './config-options-routing.module';
import { ConfigOptionDetailsOverviewComponent } from './tabs/config-option-details-overview/config-option-details-overview.component';
import { ConfigOptionEditFormComponent } from './tabs/config-option-edit-form/config-option-edit-form.component';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';


@NgModule({
  declarations: [
    ConfigOptionCreateComponent,
    ConfigOptionEditComponent,
    ConfigOptionDetailsComponent,
    ConfigOptionListComponent,
    ConfigOptionDetailsOverviewComponent,
    ConfigOptionEditFormComponent,
  ],
  entryComponents: [
    ConfigOptionDetailsOverviewComponent,
    ConfigOptionEditFormComponent,
  ],
  imports: [
    CommonModule,
    ConfigOptionsRoutingModule,
    ErrorHandlingModule,
    ReactiveFormsModule,
    ObjectsViewModule,
  ]
})
export class ConfigOptionsModule {
}
