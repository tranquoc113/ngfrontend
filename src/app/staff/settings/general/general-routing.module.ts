import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/auth/auth.guard';
import { SettingsGeneralComponent } from './settings-general/settings-general.component';
import { NewTosComponent } from './new-tos/new-tos.component';
import { EditTosComponent } from './edit-tos/edit-tos.component';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { TosResolver } from '@fleio-api/core/tos.resolver';

const routes: Routes = [
  {
    path: '',
    component: SettingsGeneralComponent,
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'settings.general'
      }
    }
  },
  {
    path: 'new-tos',
    component: NewTosComponent,
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'settings.general',
        getBreadCrumbDetail: () => {
          return 'Create terms of service';
        }
      } as IRouteConfig
    }
  },
  {
    path: 'edit-tos/:id',
    component: EditTosComponent,
    canActivate: [AuthGuard],
    resolve: {
      tos: TosResolver,
    },
    data: {
      config: {
        feature: 'settings.general',
        getBreadCrumbDetail: () => {
          return 'Edit terms of service';
        }
      } as IRouteConfig
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {
}
