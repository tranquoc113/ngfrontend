import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IRouteConfig } from '@shared/ui-api/interfaces/route-config/route-config';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { OrderingDirection } from '@shared/ui-api/interfaces/route-config/ordering-directions';
import { AuthGuard } from '@shared/auth/auth.guard';
import { ProductGroupsListResolver } from '@fleio-api/billing/product-groups/product-groups-list.resolver';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductResolver } from '@fleio-api/billing/products/product.resolver';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductCreateOptionsResolver } from '@fleio-api/billing/products/product-create-options.resolver';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
    resolve: {
      products: ProductGroupsListResolver,
    },
    canActivate: [AuthGuard],
    data: {
      config: {
        feature: 'billing.products',
        search: {
          show: true,
          placeholder: 'Search products ...',
        },
        subheader: {
          objectNamePlural: 'product groups',
          objectName: 'products',
          objectList(data): FleioObjectsList<IBaseFleioObjectModel> {
            return data.products;
          }
        },
        ordering: {
          default: {
            field: 'name',
            display: 'Name',
            direction: OrderingDirection.Ascending,
          },
          options: [
            {display: 'Name', field: 'name'},
          ]
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'create',
    component: ProductCreateComponent,
    resolve: {
      createOptions: ProductCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return 'Create product';
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id',
    component: ProductDetailsComponent,
    resolve: {
      product: ProductResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return data.product.name;
        },
      } as IRouteConfig,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':id/edit',
    component: ProductEditComponent,
    resolve: {
      product: ProductResolver,
      createOptions: ProductCreateOptionsResolver,
    },
    data: {
      config: {
        getBreadCrumbDetail: (data) => {
          return `Edit ${data.product.name}`;
        },
      } as IRouteConfig,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
}
