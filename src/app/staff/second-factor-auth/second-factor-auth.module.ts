import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SecondFactorAuthRoutingModule } from './second-factor-auth.routing.module';
import { SfaOptionsComponent } from './sfa-options/sfa-options.component';
import { ObjectsViewModule } from '@objects-view/objects-view.module';
import { SfaConfirmPasswordComponent } from './sfa-confirm-password/sfa-confirm-password.component';


@NgModule({
  declarations: [
    SfaOptionsComponent,
    SfaConfirmPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SecondFactorAuthRoutingModule,
    ObjectsViewModule
  ]
})
export class SecondFactorAuthModule {
}
