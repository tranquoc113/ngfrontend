import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../shared/auth/login/login.component';
import { AuthGuard } from '../shared/auth/auth.guard';
import { PageNotFoundComponent } from '../shared/error-handling/page-not-found/page-not-found.component';
import { DisconnectedFromServerComponent } from '../shared/error-handling/disconnected-from-server/disconnected-from-server.component';
import { LogoutComponent } from '../shared/auth/logout/logout.component';
import { ForgotPasswordComponent } from '../shared/auth/forgot-password/forgot-password.component';
import { NewPasswordComponent } from '../shared/auth/new-password/new-password.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'clients-users',
    loadChildren: () => import('./clients-users/clients-users.module').then(mod => mod.ClientsUsersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'openstack',
    loadChildren: () => import('./openstack/openstack.module').then(mod => mod.OpenstackModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'billing',
    loadChildren: () => import('./billing/billing.module').then(mod => mod.BillingModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(mod => mod.SettingsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(mod => mod.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reset',
    component: ForgotPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reset-password/:userid/:token',
    component: NewPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'disconnected',
    component: DisconnectedFromServerComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResellerRoutingModule { }
