import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/auth/auth.guard';

const routes: Routes = [
  {
    path: 'domains',
    loadChildren: () => import('./domains/domains.module').then(mod => mod.DomainsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo-routing.module').then(mod => mod.TodoRoutingModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'tickets',
    loadChildren: () => import('./tickets/tickets-routing.module').then(mod => mod.TicketsRoutingModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginsRoutingModule { }
