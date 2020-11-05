import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingRuleCreateComponent } from './pricing-rule-create/pricing-rule-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorHandlingModule } from '../../../../shared/error-handling/error-handling.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ObjectsViewModule } from '../../../../shared/ui/objects-view/objects-view.module';
import { PricingRulesRoutingModule } from './pricing-rules-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { FlexModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { PricingRuleEditComponent } from './pricing-rule-edit/pricing-rule-edit.component';

@NgModule({
  declarations: [
    PricingRuleCreateComponent,
    PricingRuleEditComponent
  ],
  imports: [
    CommonModule,
    PricingRulesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ErrorHandlingModule,
    ReactiveFormsModule,
    ObjectsViewModule,
    MatSelectModule,
    FlexModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatDividerModule,
  ],
  providers: [
  ]
})
export class PricingRulesModule { }
