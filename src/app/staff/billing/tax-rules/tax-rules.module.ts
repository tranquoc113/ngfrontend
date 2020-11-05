import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlingModule } from '../../../shared/error-handling/error-handling.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ObjectsViewModule } from '../../../shared/ui/objects-view/objects-view.module';
import { FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { TaxRulesListComponent } from './tax-rules-list/tax-rules-list.component';
import { TaxRulesRoutingModule } from './tax-rules-routing.module';
import { TaxRuleCreateComponent } from './tax-rule-create/tax-rule-create.component';
import { TaxRuleEditFormComponent } from './tabs/tax-rule-edit-form/tax-rule-edit-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TaxRuleEditComponent } from './tax-rule-edit/tax-rule-edit.component';
import { UiModule } from '@shared/ui/ui.module';


@NgModule({
  declarations: [
    TaxRulesListComponent,
    TaxRuleCreateComponent,
    TaxRuleEditFormComponent,
    TaxRuleEditComponent,
  ],
  entryComponents: [
  ],
  exports: [
  ],
    imports: [
        CommonModule,
        TaxRulesRoutingModule,
        ErrorHandlingModule,
        MatDialogModule,
        ReactiveFormsModule,
        ObjectsViewModule,
        FlexModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        UiModule,
    ]
})
export class TaxRulesModule {
}
