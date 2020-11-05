import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { IDomainContactModel } from '@fleio-api/plugins/domains/model/domain-contact.model';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { DomainContactsApiService } from '@fleio-api/plugins/domains/domain-contacts-api.service';
import { DatePipe } from '@angular/common';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { IObjectStatus } from '@objects-view/interfaces/object-status';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { ContactDetailsOverviewComponent } from './tabs/contact-details-overview/contact-details-overview.component';
import { ContactEditFormComponent } from './tabs/contact-edit-form/contact-edit-form.component';

export class ContactUiService extends ObjectUIServiceBase<IDomainContactModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly domainContactsApiService: DomainContactsApiService;
  private readonly datePipe: DatePipe;


  constructor(
    contact: IDomainContactModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, domainContactsApiService: DomainContactsApiService
  ) {
    super(contact, permissions, state);
    this.router = router;
    this.config = config;
    this.domainContactsApiService = domainContactsApiService;
    this.datePipe = new DatePipe(this.config.locale);
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
    return null;
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'details':
        return {
          text: `Domain contact ${this.object.first_name} ${this.object.last_name}`,
        };

      case 'edit':
        return {
          text: `Edit domain contact ${this.object.first_name} ${this.object.last_name}`,
        };

      case 'create':
        return {
          text: `Create new domain contact`,
        };

      default:
        return {
          text: `${this.object.first_name} ${this.object.last_name}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit domain contact',
        routerUrl: this.config.getPanelUrl(`plugins/domains/contacts/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    const deleteAction = new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete domain contact',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete domain contact',
          message: `Are you sure you want to delete contact ${this.object.first_name} ${this.object.last_name}`,
        },
        successMessage: 'Domain contact deleted',
        errorMessage: 'Failed to delete domain contact, check logs for details',
        apiService: this.domainContactsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: '/plugins/domains/contacts',
      }
    );

    actions.push(deleteAction);

    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`plugins/domains/contacts`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`plugins/domains/contacts`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Save'}));
        break;
      case 'details':
        actions.push(new RouterLinkAction({
            name: 'Back',
            routerUrl: this.config.getPrevUrl(`plugins/domains/contacts`),
            router: this.router,
          }
        ));
        break;
      default:
        break;
    }

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`plugins/domains/contacts/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {name: 'Created at', value: this.datePipe.transform(this.object.created_at, 'medium')},
      {name: 'Email', value: this.object.email},
      {name: 'Address', value: `${this.object.address1} ${this.object.address1}`},
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: ContactDetailsOverviewComponent,
          },
        ];
      case 'create':
        return [
          {
            tabName: 'Create',
            component: ContactEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: ContactEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
