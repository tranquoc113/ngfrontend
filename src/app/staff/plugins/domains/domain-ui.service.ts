import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { DatePipe } from '@angular/common';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { IDomainModel } from '@fleio-api/plugins/domains/model/domain.model';
import { DomainApiService } from '@fleio-api/plugins/domains/domain-api.service';
import { DomainEditFormComponent } from './tabs/domain-edit-form/domain-edit-form.component';
import { DomainDetailsOverviewComponent } from './tabs/domain-details-overview/domain-details-overview.component';
import { DomainDetailsNameserversComponent } from './tabs/domain-details-nameservers/domain-details-nameservers.component';
import { DomainTransferFormComponent } from './tabs/domain-transfer-form/domain-transfer-form.component';
import { DomainRegisterFormComponent } from './tabs/domain-register-form/domain-register-form.component';


export class DomainUiService extends ObjectUIServiceBase<IDomainModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly domainApiService: DomainApiService;
  private readonly datePipe: DatePipe;


  constructor(
    domain: IDomainModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, domainApiService: DomainApiService
  ) {
    super(domain, permissions, state);
    this.router = router;
    this.config = config;
    this.domainApiService = domainApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    switch (this.object.status) {

      case 'undefined':
      case 'unmanaged':
        return {type: StatusType.Defined, value: StatusValue.Disabled};

      case 'pending':
      case 'pending_transfer':
        return {type: StatusType.Defined, value: StatusValue.Pending};
      case 'active':
      case 'grace':
      case 'redemption':
        return {type: StatusType.Defined, value: StatusValue.Pending};
      case 'expired':
      case 'cancelled':
      case 'deleted':
      case 'fraud':
        return {type: StatusType.Defined, value: StatusValue.Cancelled};

      case 'transferred_away':
        return {type: StatusType.Defined, value: StatusValue.Deactivated};
    }
    return null;
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'details':
        return {
          text: `${this.object.name}`,
          subText: `${this.object.status_display}`,
        };

      case 'edit':
        return {
          text: `Edit domain ${this.object.name}`,
        };

      case 'transfer':
        return {
          text: `Transfer domain`,
        };

      case 'register':
        return {
          text: `Register domain`,
        };

      default:
        return {
          text: `${this.object.name}`,
          subText: `${this.object.status_display}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit domain',
        routerUrl: this.config.getPanelUrl(`plugins/domains/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    const deleteAction = new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete domain',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete domain',
          message: `Are you sure you want to delete domain ${this.object.name}`,
        },
        successMessage: 'Domain deleted',
        errorMessage: 'Failed to delete domain, check logs for details',
        apiService: this.domainApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: '/plugins/domains',
      }
    );

    actions.push(deleteAction);

    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'details':
        actions.push(new RouterLinkAction({
            name: 'Back',
            routerUrl: this.config.getPrevUrl(`plugins/domains`),
            router: this.router,
          }
        ));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`plugins/domains`),
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

  getDetailsLink(): string {
    return this.config.getPanelUrl(`plugins/domains/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {name: 'Created at', value: this.datePipe.transform(this.object.created_at, 'medium')},
      {name: 'Registrar', value: this.object.last_registrar_name ? this.object.last_registrar_name : 'n/a'},
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: DomainDetailsOverviewComponent,
          },
          {
            tabName: 'Nameservers',
            component: DomainDetailsNameserversComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: DomainEditFormComponent,
          },
        ];
      case 'transfer':
        return [
          {
            tabName: 'Transfer',
            component: DomainTransferFormComponent,
          },
        ];
      case 'register':
        return [
          {
            tabName: 'Register',
            component: DomainRegisterFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
