import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'activity-log',
    loadChildren: () => import('./activity-log/activity-log.module').then(mod => mod.ActivityLogModule),
  },
  {
    path: 'operations',
    loadChildren: () => import('./operations/operations.module').then(mod => mod.OperationsModule),
  },
  {
    path: 'revenue-reports',
    loadChildren: () => import('./revenue-reports/revenue-reports.module').then(mod => mod.RevenueReportsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilsRoutingModule {
}
