import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'instances',
    loadChildren: () => import('./instances/instances.module').then(mod => mod.InstancesModule),
  },
  {
    path: 'flavors',
    loadChildren: () => import('./flavors/flavors.module').then(mod => mod.FlavorsModule),
  },
  {
    path: 'ssh-keys',
    loadChildren: () => import('./ssh-keys/ssh-keys.module').then(mod => mod.SshKeysModule),
  },
  {
    path: 'volumes',
    loadChildren: () => import('./volumes/volumes.module').then(mod => mod.VolumesModule),
  },
  {
    path: 'images',
    loadChildren: () => import('./images/images.module').then(mod => mod.ImagesModule),
  },
  {
    path: 'api-users',
    loadChildren: () => import('./api-users/api-users.module').then(mod => mod.ApiUsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenstackRoutingModule { }
