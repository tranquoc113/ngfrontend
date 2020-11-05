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
import { map } from 'rxjs/operators';

export class OrderUiService extends ObjectUIServiceBase<IOrderModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly ordersApiService: OrdersApiService;
  private datePipe: DatePipe;


  constructor(
    order: IOrderModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, ordersApiService: OrdersApiService
  ) {
    super(order, permissions, state);
    this.router = router;
    this.config = config;
    this.ordersApiService = ordersApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    switch (this.object.status) {
      case 'completed':
      case 'verified':
        return {type: StatusType.Defined, value: StatusValue.Active};
      case 'pending':
        return {type: StatusType.Defined, value: StatusValue.Suspended};
      case 'cancelled':
        return {type: StatusType.Changing, value: StatusValue.Error};
      default:
        return {type: StatusType.None, value: StatusValue.None};
    }
  }

  getTitle(): ITitle {
    const invoiceStatus = this.object.invoice ? this.object.invoice.status : 'n/a'
    switch (this.state) {
      case 'details':
      case 'card-view':
        return {
          text: `Order ${this.object.id}`,
          subText: `${this.object.status} - ${invoiceStatus}`.toLocaleUpperCase(),
        };

      default:
        return {
          text: `${this.object.id}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    if (['pending', 'verified'].includes(this.object.status)) {
      actions.push(new CallbackAction(
        {
          object: this.object,
          icon: {name: 'done'},
          name: 'Accept',
          tooltip: 'Accept order',
          refreshAfterExecute: true,
          options: {
            displayConfirmation: true,
            displayMessages: true,
          },
          confirmOptions: {
            confirm: true,
            title: 'Accept order',
            message: `Are you sure you want to accept order ${this.object.id}?`,
          },
          callback: () => {
            return this.ordersApiService.objectPostAction(
              this.object.id, 'accept', {}
            ).pipe(map(() => {
                return {success: true, message: 'Order accepted'};
              }
            ))
          }
        }
      ));
    }

    if (this.object.status !== 'cancel') {
      actions.push(new CallbackAction(
        {
          object: this.object,
          icon: {name: 'cancel'},
          name: 'Cancel',
          tooltip: 'Cancel order',
          refreshAfterExecute: true,
          options: {
            displayConfirmation: true,
            displayMessages: true,
          },
          confirmOptions: {
            confirm: true,
            title: 'Accept order',
            message: `Are you sure you want to cancel order ${this.object.id}?`,
          },
          callback: () => {
            return this.ordersApiService.objectPostAction(
              this.object.id, 'cancel', {}
            ).pipe(map(() => {
                return {success: true, message: 'Order cancelled'};
              }
            ))
          }
        }
      ));
    }

    if (this.object.status === 'pending') {
      actions.push(new CallbackAction(
        {
          object: this.object,
          icon: {name: 'verified'},
          name: 'Verify',
          tooltip: 'Set as verified',
          refreshAfterExecute: true,
          options: {
            displayConfirmation: true,
            displayMessages: true,
          },
          confirmOptions: {
            confirm: true,
            title: 'Set as verified',
            message: `Are you sure you want to set order ${this.object.id} as verified?`,
          },
          callback: () => {
            return this.ordersApiService.objectPostAction(
              this.object.id, 'verify', {}
            ).pipe(map(() => {
                return {success: true, message: 'Order set as verified'};
              }
            ))
          }
        }
      ));
    }

    if (this.object.status !== 'pending') {
      actions.push(new CallbackAction(
        {
          object: this.object,
          icon: {name: 'undo'},
          name: 'Set back to pending',
          tooltip: 'Set back to pending',
          refreshAfterExecute: true,
          options: {
            displayConfirmation: true,
            displayMessages: true,
          },
          confirmOptions: {
            confirm: true,
            title: 'Set back to pending',
            message: `Are you sure you want to set order ${this.object.id} back to pending?`,
          },
          callback: () => {
            return this.ordersApiService.objectPostAction(
              this.object.id, 'pending', {}
            ).pipe(map(() => {
                return {success: true, message: 'Order set as pending'};
              }
            ))
          }
        }
      ));
    }

    actions.push(new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        name: 'Delete',
        tooltip: 'Delete order',
        refreshAfterExecute: true,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('billing/orders'),
        confirmOptions: {
          confirm: true,
          title: 'Delete order',
          message: `Are you sure you want to delete order ${this.object.id}?`,
        },
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
    const fields = [
      {
        name: 'Client',
        value: `${this.object.client.name || 'n/a'}`,
      },
      {
        name: 'User',
        value: `${this.object.user.username || 'n/a'}`,
      },
      {
        name: 'Order date',
        value: this.datePipe.transform(this.object.order_date, 'medium'),
      },
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
