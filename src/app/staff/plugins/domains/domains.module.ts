import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainListComponent } from './domain-list/domain-list.component';
import { DomainEditComponent } from './domain-edit/domain-edit.component';
import { DomainEditFormComponent } from './tabs/domain-edit-form/domain-edit-form.component';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { DomainsRoutingModule } from './domains-routing.module';
import { DomainRegisterComponent } from './domain-register/domain-register.component';
import { DomainTransferComponent } from './domain-transfer/domain-transfer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { DomainDetailsComponent } from './domain-details/domain-details.component';
import { DomainDetailsOverviewComponent } from './tabs/domain-details-overview/domain-details-overview.component';
import { DomainDetailsNameserversComponent } from './tabs/domain-details-nameservers/domain-details-nameservers.component';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DomainRegisterFormComponent } from './tabs/domain-register-form/domain-register-form.component';
import { DomainTransferFormComponent } from './tabs/domain-transfer-form/domain-transfer-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { UiModule } from '../../../shared/ui/ui.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    DomainListComponent,
    DomainEditComponent,
    DomainEditFormComponent,
    DomainRegisterComponent,
    DomainTransferComponent,
    DomainDetailsComponent,
    DomainDetailsOverviewComponent,
    DomainDetailsNameserversComponent,
    DomainRegisterFormComponent,
    DomainTransferFormComponent,
  ],
  imports: [
    CommonModule,
    DomainsRoutingModule,
    ObjectsViewModule,
    ReactiveFormsModule,
    ErrorHandlingModule,
    MatFormFieldModule,
    MatInputModule,
    FlexModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    UiModule,
    MatTableModule,
  ]
})
export class DomainsModule {
}
