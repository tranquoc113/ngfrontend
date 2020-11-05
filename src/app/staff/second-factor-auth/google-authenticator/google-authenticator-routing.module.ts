import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleAuthenticatorConfirmComponent } from '@shared/common-tabs/second-factor-authentication/google-authenticator/google-authenticator-confirm/google-authenticator-confirm.component';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { GoogleAuthenticatorDetailsComponent } from './google-authenticator-details/google-authenticator-details.component';
import { AuthGuard } from '@shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: GoogleAuthenticatorDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'clients&users.second_factor_auth.google_authenticator',
        getBreadCrumbDetail: (data) => {
          return 'Details';
        },
      } as IRouteConfig,
    },
  },
  {
    path: 'confirm',
    component: GoogleAuthenticatorConfirmComponent,
    data: {
      config: {
        feature: 'clients&users.second_factor_auth.google_authenticator',
        getBreadCrumbDetail: (data) => {
          return 'Google authenticator confirm';
        },
      } as IRouteConfig,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleAuthenticatorRoutingModule {
}
