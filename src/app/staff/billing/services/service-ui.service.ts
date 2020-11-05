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
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { IServiceModel } from '@fleio-api/billing/model/service.model';
import { ServicesApiService } from '@fleio-api/billing/services/service-api.service';
import { ServiceDetailsOverviewComponent } from '@billing-service-tabs/service-details-overview/service-details-overview.component';
import { ServiceEditFormComponent } from '@billing-service-tabs/service-edit-form/service-edit-form.component';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { MatDialog } from '@angular/material/dialog';
import { ServiceEnableBillingComponent } from '@billing-service-dialogs/service-enable-billing/service-enable-billing.component';
import { ServiceChangeOptionsFormComponent } from './tabs/service-change-options-form/service-change-options-form.component';
import { ServiceChangeProductFormComponent } from './tabs/service-change-product-form/service-change-product-form.component';

export class ServiceUIService extends ObjectUIServiceBase<IServiceModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly servicesApiService: ServicesApiService;
  private readonly matDialog: MatDialog;


  constructor(
    service: IServiceModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, servicesApiService: ServicesApiService, matDialog: MatDialog
  ) {
    super(service, permissions, state);
    this.matDialog = matDialog;
    this.router = router;
    this.config = config;
    this.servicesApiService = servicesApiService;
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    switch (this.object.status) {
      case 'active':
        return {type: StatusType.Defined, value: StatusValue.Active};
      case 'pending':
        return {type: StatusType.Defined, value: StatusValue.Pending};
      case 'suspended':
        return {type: StatusType.Defined, value: StatusValue.Suspended};
      case 'terminated':
        return {type: StatusType.Defined, value: StatusValue.Terminated};
      case 'canceled':
        return {type: StatusType.Defined, value: StatusValue.Cancelled};
      case 'deleting':
        return {type: StatusType.Changing, value: StatusValue.Error};
      default:
        return {type: StatusType.None, value: StatusValue.None};
    }
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'edit':
        return {
          text: `Edit ${this.object.display_name}`,
          subText: this.object.status.toLocaleUpperCase(),
        };

      case 'create':
        return {
          text: 'Create service',
        };

      case 'change-options':
        return {
          text: `${this.object.display_name} - change service`,
        };
      case 'change-product':
        return {
          text: `${this.object.display_name} - change product`,
        };
      default:
        return {
          text: `${this.object.display_name}`,
          subText: this.object.status.toLocaleUpperCase(),
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        tooltip: 'Edit service',
        name: 'Edit',
        routerUrl: this.config.getPanelUrl(`billing/services/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    switch (this.object.status) {
      case 'active':
        actions.push(new ApiCallAction(
          {
            object: this.object,
            icon: {name: 'pause'},
            tooltip: 'Suspend service',
            name: 'Suspend',
            confirmOptions: {
              confirm: true,
              title: 'Suspend service',
              message: `Are you sure you want to suspend service ${this.object.display_name} and all associated resources`
            },
            apiService: this.servicesApiService,
            apiAction: 'suspend',
            refreshAfterExecute: true,
          }
        ));
        break;
      case 'suspended':
        actions.push(new ApiCallAction(
          {
            object: this.object,
            icon: {name: 'play_arrow'},
            tooltip: 'Resume service',
            name: 'Resume',
            confirmOptions: {
              confirm: true,
              title: 'Resume service',
              message: `Are you sure you want to resume service ${this.object.display_name}?`
            },
            apiService: this.servicesApiService,
            apiAction: 'resume',
            refreshAfterExecute: true,
          }
        ));
        break;
      case 'pending':
      case 'terminated':
        actions.push(new ApiCallAction(
          {
            object: this.object,
            icon: {name: 'add'},
            tooltip: 'Activate service',
            name: 'Activate',
            confirmOptions: {
              confirm: true,
              title: 'Activate service',
              message: `Activate service ${this.object.display_name}?`,
            },
            apiService: this.servicesApiService,
            apiAction: 'activate',
            refreshAfterExecute: true,
          }
        ));
        break;
    }

    if (this.object.last_service_cycle_state && (this.object.last_service_cycle_state === 'payment canceled' ||
      this.object.last_service_cycle_state === 'refunded')) {
      actions.push(new CallbackAction(
        {
          object: this.object,
          icon: {name: 'play_arrow'},
          tooltip: 'Enable billing',
          name: 'Enable billing',
          callback: () => {
            return this.matDialog.open(
              ServiceEnableBillingComponent, {
                data: {service: this.object}
              }).afterClosed().pipe(map(result => {
              if (result === false) {
                return;
              }
              this.router.navigateByUrl(
                this.config.getPanelUrl('billing/services')
              ).catch();
              return {message: result} as IActionResult;
            }));
          }
        }
      ));
    }

    if (this.object.status !== 'terminated') {
      actions.push(new ApiCallAction(
        {
          object: this.object,
          icon: {name: 'cancel'},
          tooltip: 'Terminate service',
          name: 'Terminate',
          confirmOptions: {
            confirm: true,
            title: 'Terminate service',
            message: `Are you sure you want to terminate service ${this.object.display_name}?`,
          },
          apiService: this.servicesApiService,
          apiAction: 'terminate',
          refreshAfterExecute: true,
        }
      ));
    }

    if (['active', 'suspended'].includes(this.object.status)) {
      actions.push(new ApiCallAction(
        {
          object: this.object,
          icon: {name: 'receipt'},
          tooltip: 'Issue invoice',
          name: 'Issue invoice',
          confirmOptions: {
            confirm: true,
            title: 'Issue invoice',
            message: `Issue invoice for service ${this.object.display_name}?`,
          },
          apiService: this.servicesApiService,
          apiAction: 'invoice',
          refreshAfterExecute: true,
        }
      ));
    }

    actions.push(new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete service',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete service',
          message: `Are you sure you want to delete service ${this.object.display_name}? All data will be lost.`,
        },
        successMessage: 'Service deleted',
        errorMessage: 'Failed to delete service, check logs for details',
        apiService: this.servicesApiService,
        callType: CallType.Delete,
        refreshAfterExecute: true,
      }
    ));

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`billing/services/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const datePipe = new DatePipe(this.config.locale);
    const fields = [
      {
        name: 'Client',
        value: this.object.client.name,
      },
      {
        name: 'Created at',
        value: `${datePipe.transform(this.object.created_at)}`,
      },
      {
        name: 'Current cycle end',
        value: `${datePipe.transform(this.object.current_service_cycle_end)}`,
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
            component: ServiceDetailsOverviewComponent,
          },
        ];
      case 'edit':
      case 'create':
        return [
          {
            tabName: 'Edit',
            component: ServiceEditFormComponent,
          },
        ];
      case 'change-options':
        return [
          {
            tabName: 'Edit',
            component: ServiceChangeOptionsFormComponent,
          },
        ];
      case 'change-product':
        return [
          {
            tabName: 'Edit',
            component: ServiceChangeProductFormComponent,
          },
        ];
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
            routerUrl: this.config.getPrevUrl(`billing/services`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`billing/services`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Save'}));
        break;
      default:
        break;
    }

    return actions;
  }
}
