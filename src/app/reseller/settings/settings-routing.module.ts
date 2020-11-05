import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./openstack/openstack.module').then(mod => mod.OpenstackModule),
  },
  {
    path: 'configurations',
    loadChildren: () => import('./configurations/configurations.module').then(mod => mod.ConfigurationsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule { }
