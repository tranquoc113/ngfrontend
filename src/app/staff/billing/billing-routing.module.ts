import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'gateways',
    loadChildren: () => import('./gateways/gateways.module').then(mod => mod.GatewaysModule),
  },
  {
    path: 'configurable-options',
    loadChildren: () => import('./configurable-options/configurable-options.module').then(
      mod => mod.ConfigurableOptionsModule,
    ),
  },
  {
    path: 'journal',
    loadChildren: () => import('./journal/journal.module').then(mod => mod.JournalModule),
  },
  {
    path: 'invoices',
    loadChildren: () => import('./invoices/invoices.module').then(mod => mod.InvoicesModule),
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule),
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then(mod => mod.ServicesModule),
  },
  {
    path: 'tax-rules',
    loadChildren: () => import('./tax-rules/tax-rules.module').then(mod => mod.TaxRulesModule),
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(mod => mod.ProductsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingRoutingModule { }
