import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { IAction } from '@objects-view/interfaces/actions/action';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { MatDialog } from '@angular/material/dialog';
import { ProductGroupsApiService } from '@fleio-api/billing/product-groups/product-groups-api.service';
import { IProductGroupModel } from '@fleio-api/billing/model/product-group.model';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { ProductDetailsOverviewComponent } from '@shared/common-tabs/billing/products/product-details-overview/product-details-overview.component';
import { IProductModel } from '@fleio-api/billing/model/product.model';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { ProductCycleEditFormComponent } from '@shared/common-dialogs/billing/products/product-cycle-edit-form/product-cycle-edit-form.component';
import { ProductsApiService } from '@fleio-api/billing/products/product-api.service';
import { ProductGroupEditFormComponent } from '@shared/common-dialogs/billing/products/product-group-edit-form/product-group-edit-form.component';
import { ProductEditFormComponent } from '@shared/common-tabs/billing/products/product-edit-form/product-edit-form.component';
import { ProductDetailsConfOptsComponent } from '@shared/common-tabs/billing/products/product-details-conf-opts/product-details-conf-opts.component';
import { ProductDetailsUpgradesComponent } from '@shared/common-tabs/billing/products/product-details-upgrades/product-details-upgrades.component';

export class ProductUIService extends ObjectUIServiceBase<IProductGroupModel & IProductModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly productGroupsApiService: ProductGroupsApiService;
  private readonly matDialog: MatDialog;
  private readonly productsApiService: ProductsApiService;
  private readonly activatedRoute: ActivatedRoute;

  constructor(
    object: IProductGroupModel & IProductModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, productGroupsApiService: ProductGroupsApiService, matDialog: MatDialog,
    productsApiService: ProductsApiService, activatedRoute: ActivatedRoute
  ) {
    super(object, permissions, state);
    this.matDialog = matDialog;
    this.router = router;
    this.config = config;
    this.productGroupsApiService = productGroupsApiService;
    this.productsApiService = productsApiService;
    this.activatedRoute = activatedRoute;
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    return {type: StatusType.None, value: StatusValue.None};
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'create':
        return {
          text: 'Create product'
        }
      case 'edit':
        return {
          text: 'Edit product'
        }
      default:
        return {
          text: `${this.object.name}`,
          subText: `${this.object.description} (${this.object.status})`
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];
    switch (this.state) {
      case 'table-view':
        actions.push(new CallbackAction({
          tooltip: 'Edit product group',
          icon: {name: 'edit'},
          name: 'Edit product group',
          callback: action => {
            return this.matDialog.open(
              ProductGroupEditFormComponent, {
                data: {productGroup: this.object}
              }).afterClosed().pipe(map(result => {
                if (result === 'true' || result === true) {
                  const queryParams = {};
                  Object.assign(queryParams, this.activatedRoute.snapshot.queryParams);
                  this.router.navigate([], {
                    relativeTo: this.activatedRoute,
                    queryParams
                  }).catch(() => {
                    // error has to be handled by interceptor, or where the request is done
                  });
                }
                return {message: result} as IActionResult;
            }));
          }
        }));
        let deleteGroupTooltip = 'Delete product group';
        if (this.object && this.object.products && this.object.products.length) {
          deleteGroupTooltip = 'Cannot delete group while\nit contains products';
        }
        actions.push(new ApiCallAction(
        {
          object: this.object,
          icon: {name: 'delete'},
          tooltip: deleteGroupTooltip,
          name: 'Delete',
          confirmOptions: {
            confirm: true,
            title: 'Delete product group',
            message: `Are you sure you want to delete product group ${this.object.name}`,
          },
          apiService: this.productGroupsApiService,
          successMessage: 'Product group deleted',
          errorMessage: 'Failed to delete product group, check logs for details',
          callType: CallType.Delete,
          refreshAfterExecute: false,
          redirectAfterExecute: true,
          redirectUrl: '/billing/products',
          disabled: !!(this.object && this.object.products && this.object.products.length)
        }));
        break;
      case 'details':
        actions.push(new RouterLinkAction({
          icon: {name: 'edit'},
          name: 'Edit',
          tooltip: 'Edit product',
          routerUrl: this.config.getPanelUrl(`billing/products/${this.object.id}/edit`),
          router: this.router,
        }));
        let addCycleTooltip = 'Add cycle';
        if (this.object.price_model === 'free') {
          addCycleTooltip = 'Cannot add cycles for free product';
        }
        actions.push(new CallbackAction(
          {
            object: this.object,
            tooltip: addCycleTooltip,
            icon: {name: 'playlist_add'},
            name: 'Add cycle',
            callback: action => {
              return this.matDialog.open(
                ProductCycleEditFormComponent, {
                  data: {product: this.object}
                }).afterClosed().pipe(map(result => {
                  if (result === 'true' || result === true) {
                    this.router.navigateByUrl(
                      this.config.getPanelUrl(`billing/products/${this.object.id}`)
                    ).catch();
                  }
                  return {message: result} as IActionResult;
              }));
            },
            disabled: this.object.price_model === 'free'
          }
        ));
        actions.push(new ApiCallAction(
        {
          object: this.object,
          icon: {name: 'delete'},
          tooltip: 'Delete product',
          name: 'Delete',
          confirmOptions: {
            confirm: true,
            title: 'Delete product',
            message: `Are you sure you want to delete product ${this.object.name}`,
          },
          apiService: this.productsApiService,
          successMessage: 'Product deleted',
          errorMessage: 'Failed to delete product, check logs for details',
          callType: CallType.Delete,
          refreshAfterExecute: false,
          redirectAfterExecute: true,
          redirectUrl: '/billing/products',
        }));
        break;
      default:
        break;
    }
    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`billing/services/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    return [];
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'create':
        return [
          {
            component: ProductEditFormComponent,
            tabName: 'Create'
          }
        ]
      case 'edit':
        return [
          {
            component: ProductEditFormComponent,
            tabName: 'Edit'
          }
        ]
      case 'details':
        return [
          {
            component: ProductDetailsOverviewComponent,
            tabName: 'Overview'
          },
          {
            component: ProductDetailsConfOptsComponent,
            tabName: 'Configurable options'
          },
          {
            component: ProductDetailsUpgradesComponent,
            tabName: 'Upgrades'
          }
        ]
      default:
        return [];
    }
  }

  getCardTags(): string[] {
    return [];
  }

  getDetailsActions(): IAction[] {
    const actions = [];
    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`billing/products`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({ name: 'Save' }));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`billing/products`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({ name: 'Save' }));
        break;
      default:
        break;
    }
    return actions;
  }
}
