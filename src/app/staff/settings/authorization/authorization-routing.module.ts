import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../shared/auth/auth.guard';
import { AuthorizationEditComponent } from './authorization-edit/authorization-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationEditComponent,
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'settings.authorization'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {
}
