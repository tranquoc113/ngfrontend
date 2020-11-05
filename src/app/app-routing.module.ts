import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/error-handling/page-not-found/page-not-found.component';
import { ResellerComponent } from './reseller/reseller/reseller.component';
import { StaffComponent } from './staff/staff/staff.component';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: 'reseller',
    loadChildren: () => import('./reseller/reseller.module').then(mod => mod.ResellerModule),
    component: ResellerComponent,
    data: {
      configurationName: 'reseller',
      hideInBreadcrumbs: true,
    }
  },
  {
    path: 'staff',
    loadChildren: () => import('./staff/staff.module').then(mod => mod.StaffModule),
    component: StaffComponent,
    data: {
      configurationName: 'staff',
      hideInBreadcrumbs: true,
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

// move the route that is at the root of the app just before the last defined route and set its path to ''
for (const [index, route] of routes.entries()) {
  if (route.data) {
    if (environment.basePanel === route.data.configurationName) {
      route.path = '';
      routes.splice(routes.length - 1, 0, route);
      routes.splice(index, 1);
      break;
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
