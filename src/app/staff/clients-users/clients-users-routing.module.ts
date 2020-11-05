import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(mod => mod.ClientsModule),
  },
  {
    path: 'client-groups',
    loadChildren: () => import('./client-groups/client-groups.module').then(mod => mod.ClientGroupsModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule),
  },
  {
    path: 'user-groups',
    loadChildren: () => import('./user-groups/user-groups.module').then(mod => mod.UserGroupsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsUsersRoutingModule { }
