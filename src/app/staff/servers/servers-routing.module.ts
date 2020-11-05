import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'servers',
    loadChildren: () => import('./servers/servers.module').then(mod => mod.ServersModule),
  },
  {
    path: 'server-groups',
    loadChildren: () => import('./server-groups/server-groups.module').then(mod => mod.ServerGroupsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServersRoutingModule { }
