import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '../../../shared/ui-api/interfaces/route-config/route-config';
import { AuthGuard } from '../../../shared/auth/auth.guard';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { OrderingDirection } from '../../../shared/ui-api/interfaces/route-config/ordering-directions';
import { NotificationTemplateListComponent } from './notification-template-list/notification-template-list.component';
import { NotificationTemplatesListResolver } from '../../../shared/fleio-api/notification-templates/notification-templates-list-resolver';
import { NotificationTemplateResolver } from '../../../shared/fleio-api/notification-templates/notification-template.resolver';
import { NotificationTemplateCreateOptionsResolver } from '../../../shared/fleio-api/notification-templates/notification-template-create-options.resolver';
import { NotificationTemplateEditComponent } from './notification-template-edit/notification-template-edit.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationTemplateListComponent,
    resolve: {
      notificationTemplates: NotificationTemplatesListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'settings.notifications.templates',
        search: {
          show: true,
          placeholder: 'Search notification templates ...',
        },
        subheader: {
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.notificationTemplates;
          },
          objectName: 'notification template',
          objectNamePlural: 'notification templates',
        },
        ordering: {
          default: {
            display: 'Name',
            field: 'name',
            direction: OrderingDirection.Ascending,
          },
          options: [
            {
              display: 'Name',
              field: 'name',
            }
          ]
        }
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
  // {
  //   path: 'create',
  //   component: NotificationTemplateCreateComponent,
  //   resolve: {},
  //   data: {
  //     config: {
  //       getBreadCrumbDetail: () => {
  //         return 'Create notification template';
  //       },
  //     } as IRouteConfig,
  //   }
  // },
  // {
  //   path: ':id',
  //   component: NotificationTemplateDetailsComponent,
  //   resolve: {
  //     notificationTemplate: NotificationTemplateResolver,
  //   },
  //   data: {
  //     config: {
  //       getBreadCrumbDetail: (data) => {
  //         return data.notificationTemplate.name;
  //       },
  //     } as IRouteConfig,
  //   }
  // },
  {
    path: ':id/edit',
    component: NotificationTemplateEditComponent,
    resolve: {
      notificationTemplate: NotificationTemplateResolver,
      createOptions: NotificationTemplateCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit notification template ${data.notificationTemplate[0].name}`;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationTemplatesRoutingModule {
}
