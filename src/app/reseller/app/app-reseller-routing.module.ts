import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../../shared/error-handling/page-not-found/page-not-found.component';
import { ResellerComponent } from '../reseller/reseller.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../reseller.module').then(mod => mod.ResellerModule),
    component: ResellerComponent,
    data: {
      configurationName: 'reseller',
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
export class AppResellerRoutingModule { }
