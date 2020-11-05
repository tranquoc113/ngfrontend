import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'api-users',
    loadChildren: () => import('./api-users/api-users.module').then(mod => mod.ApiUsersModule),
  },
  {
    path: 'clusters',
    loadChildren: () => import('./clusters/clusters.module').then(mod => mod.ClustersModule),
  },
  {
    path: 'cluster-templates',
    loadChildren: () => import('./cluster-templates/cluster-templates.module').then(mod => mod.ClusterTemplatesModule),
  },
  {
    path: 'flavors',
    loadChildren: () => import('./flavors/flavors.module').then(mod => mod.FlavorsModule),
  },
  {
    path: 'flavor-groups',
    loadChildren: () => import('./flavor-groups/flavor-groups.module').then(mod => mod.FlavorGroupsModule),
  },
  {
    path: 'floating-ips',
    loadChildren: () => import('./floating-ips/floating-ips.module').then(mod => mod.FloatingIpsModule),
  },
  {
    path: 'images',
    loadChildren: () => import('./images/images.module').then(mod => mod.ImagesModule),
  },
  {
    path: 'instances',
    loadChildren: () => import('./instances/instances.module').then(mod => mod.InstancesModule),
  },
  {
    path: 'networks',
    loadChildren: () => import('./networks/networks.module').then(mod => mod.NetworksModule),
  },
  {
    path: 'ports',
    loadChildren: () => import('./ports/ports.module').then(mod => mod.PortsModule),
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then(mod => mod.ProjectsModule),
  },
  {
    path: 'routers',
    loadChildren: () => import('./routers/routers.module').then(mod => mod.RoutersModule),
  },
  {
    path: 'security-groups',
    loadChildren: () => import('./security-groups/security-groups.module').then(mod => mod.SecurityGroupsModule),
  },
  {
    path: 'ssh-keys',
    loadChildren: () => import('./ssh-keys/ssh-keys.module').then(mod => mod.SshKeysModule),
  },
  {
    path: 'subnet-pools',
    loadChildren: () => import('./subnet-pools/subnet-pools.module').then(mod => mod.SubnetPoolsModule),
  },
  {
    path: 'volumes',
    loadChildren: () => import('./volumes/volumes.module').then(mod => mod.VolumesModule),
  },
  {
    path: 'volume-backups',
    loadChildren: () => import('./volume-backups/volume-backups.module').then(mod => mod.VolumeBackupsModule),
  },
  {
    path: 'volume-snapshots',
    loadChildren: () => import('./volume-snapshots/volume-snapshots.module').then(mod => mod.VolumeSnapshotsModule),
  },
  {
    path: 'zones',
    loadChildren: () => import('./zones/zones.module').then(mod => mod.ZonesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenstackRoutingModule { }
