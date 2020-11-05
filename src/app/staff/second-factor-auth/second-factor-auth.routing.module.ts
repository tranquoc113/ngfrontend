import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { ConfirmOptionsComponent } from '@shared/common-tabs/second-factor-authentication/confirm-options/confirm-options.component';
import { SfaOptionsComponent } from './sfa-options/sfa-options.component';
import { SfaTypesResolver } from '@fleio-api/second-factor-authentication/sfa-types.resolver';
import { SfaConfirmPasswordComponent } from './sfa-confirm-password/sfa-confirm-password.component';
import { AuthGuard } from '@shared/auth/auth.guard';

const routes: Routes = [
  {
    path: 'google-authenticator',
    loadChildren: () => import('./google-authenticator/google-authenticator.module').then(mod => mod.GoogleAuthenticatorModule),
  },
  {
    path: 'sms-authenticator',
    loadChildren: () => import('./sms-authenticator/sms-authenticator.module').then(mod => mod.SmsAuthenticatorModule),
  },
  {
    path: 'confirm-options',
    component: ConfirmOptionsComponent,
    data: {
      config: {
        feature: 'clients&users.second_factor_auth',
        getBreadCrumbDetail: (data) => {
          return 'Confirm options';
        },
      } as IRouteConfig,
    },
  },
  {
    path: 'options',
    component: SfaOptionsComponent,
    resolve: {
      sfaOptions: SfaTypesResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'clients&users.second_factor_auth',
        getBreadCrumbDetail: () => {
          return 'SFA options';
        },
      } as IRouteConfig,
    }
  },
  {
    path: 'confirm-password',
    component: SfaConfirmPasswordComponent,
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'clients&users.second_factor_auth',
        getBreadCrumbDetail: () => {
          return 'Confirm password';
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecondFactorAuthRoutingModule {
}
