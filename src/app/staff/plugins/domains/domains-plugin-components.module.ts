import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '@shared/error-handling/error-handling.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { ClientDetailsDomainListComponent } from './client-details-domain-list/client-details-domain-list.component';
import { UiModule } from '@shared/ui/ui.module';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { DomainsPluginConfigurationComponent } from './domains-plugin-configuration/domains-plugin-configuration.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    ClientDetailsDomainListComponent,
    DomainsPluginConfigurationComponent,
  ],
  imports: [
    CommonModule,
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
    RouterModule,
    MatExpansionModule,
  ]
})
export class DomainsPluginComponentsModule {
}
