import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { ApiCallAction } from '@objects-view/actions/api-call-action';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { DatePipe } from '@angular/common';
import { IOrderModel } from '@fleio-api/billing/model/order.model';
import { OrdersApiService } from '@fleio-api/billing/orders/order-api.service';
import { OrderDetailsOverviewComponent } from '@shared/common-tabs/billing/orders/order-details-overview/order-details-overview.component';

export class OrderUiService extends ObjectUIServiceBase<IOrderModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly ordersApiService: OrdersApiService;


  constructor(
    order: IOrderModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, ordersApiService: OrdersApiService
  ) {
    super(order, permissions, state);
    this.router = router;
    this.config = config;
    this.ordersApiService = ordersApiService;
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    switch (this.object.status) {
      case 'active':
        return {type: StatusType.Defined, value: StatusValue.Active};
      case 'suspended':
        return {type: StatusType.Defined, value: StatusValue.Suspended};
      case 'deleting':
        return {type: StatusType.Changing, value: StatusValue.Error};
      default:
        return {type: StatusType.None, value: StatusValue.None};
    }
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'details':
        return {
          text: `Order ${this.object.id}`,
        };

      case 'edit':
        return {
          text: `Edit ${this.object.id}`,
        };

      case 'create':
        return {
          text: 'Create order',
        };

      default:
        return {
          text: `${this.object.id}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete order',
          message: `Are you sure you want to delete order ${this.object.id}` +
            'All data will be lost.',
        },
        successMessage: 'Order deleted',
        errorMessage: 'Failed to delete order',
        apiService: this.ordersApiService,
        apiAction: 'delete',
      }
    ));

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`billing/orders/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const datePipe = new DatePipe(this.config.locale);
    const fields = [
      {
        name: 'Total',
        value: `${datePipe.transform(this.object.total)}`
      }
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: OrderDetailsOverviewComponent,
          },
        ];
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
            routerUrl: this.config.getPrevUrl(`billing/orders`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      default:
        break;
    }

    return actions;
  }
}
