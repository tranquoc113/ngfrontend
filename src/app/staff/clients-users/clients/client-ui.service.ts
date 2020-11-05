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
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { DatePipe } from '@angular/common';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { ClientDetailsOverviewComponent } from '@shared/common-tabs/clients-users/clients/client-details-overview/client-details-overview.component';
import { ClientDetailsInvoicesComponent } from '@shared/common-tabs/clients-users/clients/client-details-invoices/client-details-invoices.component';
import { ClientDetailsJournalComponent } from '@shared/common-tabs/clients-users/clients/client-details-journal/client-details-journal.component';
import { ClientDetailsOpenstackServiceComponent } from '@shared/common-tabs/clients-users/clients/client-details-openstack-service/client-details-openstack-service.component';
import { ClientDetailsUsersComponent } from '@shared/common-tabs/clients-users/clients/client-details-users/client-details-users.component';
import { ClientDetailsConfigurationsComponent } from '@shared/common-tabs/clients-users/clients/client-details-configurations/client-details-configurations.component';
import { ClientDetailsServicesComponent } from '@shared/common-tabs/clients-users/clients/client-details-services/client-details-services.component';
import { ClientEditFormComponent } from '@shared/common-tabs/clients-users/clients/client-edit-form/client-edit-form.component';
import { ClientDetailsResellerServiceComponent } from './tabs/client-details-reseller-service/client-details-reseller-service.component';
import { ClientDetailsTicketsComponent } from '@shared/common-tabs/clients-users/clients/client-details-tickets/client-details-tickets.component';
import { ClientDetailsCloudResourcesComponent } from '@shared/common-tabs/clients-users/clients/client-details-cloud-resources/client-details-cloud-resources.component';
import { ClientSendMassEmailFormComponent } from '@shared/common-tabs/clients-users/clients/client-send-mass-email-form/client-send-mass-email-form.component';
import { ClientDetailsDomainsComponent } from '@shared/common-tabs/clients-users/clients/client-details-domains/client-details-domains.component';
import { map } from 'rxjs/operators';
import { IYesNoDialogResult } from '@shared/ui-api/interfaces/yes-no-dialog-result';

export class ClientUIService extends ObjectUIServiceBase<IClientModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly clientsApi: ClientsApiService;

  constructor(
    client: IClientModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, clientsApi: ClientsApiService
  ) {
    super(client, permissions, state);
    this.router = router;
    this.config = config;
    this.clientsApi = clientsApi;
  }

  getIcon(): IIcon {
    if (this.object && this.object.email) {
      return {
        name: '(gravatar)',
        gravatarEmail: this.object.email,
      };
    }
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
    let companySubText = '';
    if (this.object.company) {
      companySubText = this.object.company
    }
    switch (this.state) {
      case 'details':
        return {
          text: `Client ${this.object.name}`,
          subText: companySubText
        };

      case 'edit':
        return {
          text: `Edit ${this.object.name}`,
        };

      case 'create':
        return {
          text: 'Create client',
        };

      case 'send-mass-email':
        return {
          text: 'Send mass email to selected clients'
        }

      default:
        return {
          text: `${this.object.name}`,
          subText: companySubText
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit',
        routerUrl: this.config.getPanelUrl(`clients-users/clients/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    if (this.object.status === 'active') {
      actions.push(new ApiCallAction(
        {
          object: this.object,
          icon: {name: 'pause'},
          name: 'Suspend',
          tooltip: 'Suspend',
          confirmOptions: {
            confirm: true,
            title: 'Suspend client',
            message: `Are you sure you want to suspend client ${this.object.name} and all associated services`
          },
          apiService: this.clientsApi,
          apiAction: 'suspend',
        }
      ));
    }

    if (this.object.status === 'suspended') {
      actions.push(new ApiCallAction(
        {
          object: this.object,
          icon: {name: 'play_arrow'},
          name: 'Resume',
          tooltip: 'Resume',
          confirmOptions: {
            confirm: true,
            title: 'Resume client',
            message: `Are you sure you want to resume client ${this.object.name}`
          },
          apiService: this.clientsApi,
          apiAction: 'resume',
        }
      ));
    }

    const deleteAction = new CallbackAction({
      icon: {name: 'delete'},
      name: 'Delete',
      tooltip: 'Delete client',
      redirectAfterExecute: true,
      redirectUrl: this.config.getPanelUrl('clients-users/clients'),
      callback: (action) => {
        return action.notificationService.confirmDialog(
          {
            title: `Delete client ${this.object.name}`,
            importantMessage: 'Warning: deleting a client will permanently delete any invoices and orders associated ' +
              'with the client.',
            message: null,
            flags: [{
              id: 'delete-cloud-resources',
              message: ' Delete all services and resources (including cloud resources etc.)',
              warningOnSelect: 'Warning: this will permanently delete data.',
              selected: false,
            }]
          }
        ).pipe(map((result: IYesNoDialogResult) => {
          if (result && result.button && result.button === 'yes') {
            this.clientsApi.delete(
              this.object.id, {delete_cloud_resources: result.flags['delete-cloud-resources']},
              ).subscribe(() => {
                action.notificationService.showMessage('Client delete scheduled');
            });
          }
          return null;
        }))
      }
    });

    if (this.object.suspend_instead_of_terminate) {
      deleteAction.tooltip = `Delete disabled by billing settings 'suspend instead of terminate enabled' set.`;
      deleteAction.disabled = true;
    }

    actions.push(deleteAction);


    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`clients-users/clients/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const datePipe = new DatePipe(this.config.locale);
    const fields = [
      {
        name: 'Created at',
        value: `${datePipe.transform(this.object.date_created)}`
      }
    ];

    if (this.object.outofcredit_datetime) {
      fields.push(
        {
          name: 'Out of credit since',
          value: `${datePipe.transform(this.object.outofcredit_datetime, 'medium')}`
        }
      );
    } else {
      fields.push(
        {
          name: 'Up to date credit',
          value: `${this.object.uptodate_credit}`
        }
      );
    }

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        const tabs: IDetailsTab[] = [
          {
            tabName: 'Overview',
            component: ClientDetailsOverviewComponent,
          },
          {
            tabName: 'Invoices',
            component: ClientDetailsInvoicesComponent,
            featureName: 'billing.invoices'
          },
          {
            tabName: 'Journal',
            component: ClientDetailsJournalComponent,
            featureName: 'billing.journal'
          },
          {
            tabName: 'Openstack service',
            component: ClientDetailsOpenstackServiceComponent,
            featureName: 'openstack',
          },
          {
            tabName: 'Reseller service',
            component: ClientDetailsResellerServiceComponent,
            featureName: 'billing.reseller',
          },
          {
            tabName: 'Users',
            component: ClientDetailsUsersComponent,
            featureName: 'clients&users.users'
          },
          {
            tabName: 'Configurations',
            component: ClientDetailsConfigurationsComponent,
            featureName: 'settings.configurations'
          },
          {
            tabName: 'Cloud resources',
            featureName: 'openstack',
            component: ClientDetailsCloudResourcesComponent
          },
          {
            tabName: 'Services',
            component: ClientDetailsServicesComponent,
            featureName: 'billing.services'
          },
          {
            tabName: 'Domains',
            featureName: 'plugins.domains',
            component: ClientDetailsDomainsComponent,
          },
          {
            tabName: 'Tickets',
            featureName: 'plugins.tickets',
            component: ClientDetailsTicketsComponent,
          },
        ];

        return tabs;
      case 'send-mass-email':
        return [
          {
            tabName: 'Send mass email',
            component: ClientSendMassEmailFormComponent,
          }
        ]
      case 'edit':
      case 'create':
        return [
          {
            tabName: 'Edit',
            component: ClientEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags: string[] = [];
    if (this.object.configuration_name) {
      tags.push(this.object.configuration_name);
    }
    if (this.object.status === 'suspended') {
      tags.push('Suspended');
    }

    return tags;
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`clients-users/clients`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`clients-users/clients`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Save'}));
        break;
      case 'send-mass-email':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`clients-users/clients`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Send mails'}));
        break;
      default:
        break;
    }

    return actions;
  }

  getObjectDetailsRefreshInterval(): number {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      return this.config.current.settings.refreshIntervals.clientDetailsInterval;
    }
    return 5000;
  }
}
