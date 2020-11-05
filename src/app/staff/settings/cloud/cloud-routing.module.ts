import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'openstack-plans',
    loadChildren: () => import('./openstack-plans/openstack-plans.module').then(mod => mod.OpenstackPlansModule),
  },
  {
    path: 'pricing-rules',
    loadChildren: () => import('./pricing-rules/pricing-rules.module').then(mod => mod.PricingRulesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CloudRoutingModule { }
