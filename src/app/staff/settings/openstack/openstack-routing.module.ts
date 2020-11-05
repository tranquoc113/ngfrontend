import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../shared/auth/auth.guard';
import { SettingsOpenstackComponent } from './settings-openstack/settings-openstack.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsOpenstackComponent,
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'openstack.settings'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenstackRoutingModule {
}
