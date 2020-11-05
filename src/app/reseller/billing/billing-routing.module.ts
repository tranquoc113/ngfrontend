import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'invoices',
    loadChildren: () => import('./invoices/invoices.module').then(mod => mod.InvoicesModule),
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then(mod => mod.ServicesModule),
  },
  // {
  //   path: 'orders',
  //   loadChildren: () => import('./orders/orders.module').then(mod => mod.OrdersModule),
  // },
  // {
  //   path: 'config-options',
  //   loadChildren: () => import('./config-options/config-options.module').then(mod => mod.ConfigOptionsModule),
  // },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then(mod => mod.HistoryModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingRoutingModule { }
