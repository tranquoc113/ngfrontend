import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../../shared/error-handling/page-not-found/page-not-found.component';
import { StaffComponent } from '../staff/staff.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../staff.module').then(mod => mod.StaffModule),
    component: StaffComponent,
    data: {
      configurationName: 'staff',
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppStaffRoutingModule { }
