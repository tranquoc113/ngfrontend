import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmsAuthenticatorDetailsComponent } from './sms-authenticator-details/sms-authenticator-details.component';
import { SmsAuthenticatorConfirmComponent } from '@shared/common-tabs/second-factor-authentication/sms-authenticator/sms-authenticator-confirm/sms-authenticator-confirm.component';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { AuthGuard } from '@shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SmsAuthenticatorDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'clients&users.second_factor_auth.sms_authenticator',
        getBreadCrumbDetail: (data) => {
          return 'Details';
        },
      } as IRouteConfig,
    },
  },
  {
    path: 'confirm',
    component: SmsAuthenticatorConfirmComponent,
    data: {
      config: {
        feature: 'clients&users.second_factor_auth.sms_authenticator',
        getBreadCrumbDetail: (data) => {
          return 'SMS authenticator confirm';
        },
      } as IRouteConfig,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmsAuthenticatorRoutingModule {
}
