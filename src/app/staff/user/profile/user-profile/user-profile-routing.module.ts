import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '../../../../shared/ui-api/interfaces/route-config/route-config';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserProfileResolver } from '../../../../shared/fleio-api/profile/user-profile/user-profile.resolver';
import { UserProfileDetailsComponent } from './user-profile-details/user-profile-details.component';
import { UserProfileCreateOptionsResolver } from '../../../../shared/fleio-api/profile/user-profile/user-profile-create-options.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserProfileDetailsComponent,
    resolve: {
      userProfile: UserProfileResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'My profile';
        },
      } as IRouteConfig,
    }
  },
  {
    path: 'edit',
    component: UserProfileEditComponent,
    resolve: {
      userProfile: UserProfileResolver,
      createOptions: UserProfileCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: () => {
          return 'Edit user profile';
        },
      } as IRouteConfig,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {
}
