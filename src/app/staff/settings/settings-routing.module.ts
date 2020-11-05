import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./cloud/cloud.module').then(mod => mod.CloudModule),
  },
  {
    path: 'configurations',
    loadChildren: () => import('./configurations/configurations.module').then(mod => mod.ConfigurationsModule),
  },
  {
    path: 'general',
    loadChildren: () => import('./general/general.module').then(mod => mod.GeneralModule),
  },
  {
    path: 'openstack',
    loadChildren: () => import('./openstack/openstack.module').then(mod => mod.OpenstackModule),
  },
  {
    path: 'notification-templates',
    loadChildren: () => import('./notification-templates/notification-templates.module').then(
      mod => mod.NotificationTemplatesModule
    ),
  },
  {
    path: 'authorization',
    loadChildren: () => import('./authorization/authorization.module').then(mod => mod.AuthorizationModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {
}
