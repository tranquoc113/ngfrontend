import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TldListComponent } from './tld-list/tld-list.component';
import { TldCreateComponent } from './tld-create/tld-create.component';
import { TldDetailsComponent } from './tld-details/tld-details.component';
import { TldRoutingModule } from './tlds-routing.module';
import { TldEditFormComponent } from './tabs/tld-edit-form/tld-edit-form.component';
import { ObjectsViewModule } from '../../../../shared/ui/objects-view/objects-view.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingModule } from '../../../../shared/error-handling/error-handling.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TldPricingComponent } from './tabs/tld-pricing/tld-pricing.component';
import { TldAddonsPricingComponent } from './tabs/tld-addons-pricing/tld-addons-pricing.component';
import { TldRegistrarsComponent } from './tabs/tld-registrars/tld-registrars.component';
import { TldCostPricingComponent } from './tabs/tld-cost-pricing/tld-cost-pricing.component';
import { TldCustomFieldsComponent } from './tabs/tld-custom-fields/tld-custom-fields.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { PriceCyclesComponent } from './controls/price-cycles/price-cycles.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UiModule } from '@shared/ui/ui.module';

@NgModule({
  declarations: [
    TldListComponent,
    TldCreateComponent,
    TldDetailsComponent,
    TldEditFormComponent,
    TldPricingComponent,
    TldAddonsPricingComponent,
    TldRegistrarsComponent,
    TldCostPricingComponent,
    TldCustomFieldsComponent,
    PriceCyclesComponent,
  ],
    imports: [
        CommonModule,
        TldRoutingModule,
        ObjectsViewModule,
        ReactiveFormsModule,
        ErrorHandlingModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        FormsModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        UiModule,
    ]
})
export class TldsModule {
}
