import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { IDomainRegistrarModel } from '@fleio-api/plugins/domains/model/domain-registrar.model';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { DomainRegistrarsApiService } from '@fleio-api/plugins/domains/domain-registrars-api.service';
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
import { RegistrarDetailsOverviewComponent } from './tabs/registrar-details-overview/registrar-details-overview.component';
import { RegistrarEditFormComponent } from './tabs/registrar-edit-form/registrar-edit-form.component';

export class RegistrarUiService extends ObjectUIServiceBase<IDomainRegistrarModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly domainRegistrarsApiService: DomainRegistrarsApiService;
  private readonly datePipe: DatePipe;


  constructor(
    registrar: IDomainRegistrarModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, domainRegistrarsApiService: DomainRegistrarsApiService
  ) {
    super(registrar, permissions, state);
    this.router = router;
    this.config = config;
    this.domainRegistrarsApiService = domainRegistrarsApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    return null;
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'details':
        return {
          text: `Registrar ${this.object.display_name}`,
          subText: `${this.object.registrar_connector_display}`,
        };

      case 'edit':
        return {
          text: `Edit ${this.object.display_name}`,
        };

      case 'create':
        return {
          text: `Create new registrar`,
        };

      default:
        return {
          text: `${this.object.display_name}`,
          subText: `Registrar connector ${this.object.registrar_connector_display}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit registrar',
        routerUrl: this.config.getPanelUrl(`plugins/domains/registrars/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    const deleteAction = new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete domain registrar',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete domain registrar',
          message: `Are you sure you want to delete domain registrar ${this.object.display_name}`,
        },
        apiService: this.domainRegistrarsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: '/plugins/domains/registrars',
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
            routerUrl: this.config.getPrevUrl(`plugins/domains/registrars`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`plugins/domains/registrars`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Save'}));
        break;
      case 'details':
        actions.push(new RouterLinkAction({
            name: 'Back',
            routerUrl: this.config.getPrevUrl(`plugins/domains/registrars`),
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
    return this.config.getPanelUrl(`plugins/domains/registrars/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {name: 'Created at', value: this.datePipe.transform(this.object.created_at, 'medium')},
      {name: 'Registrar connector', value: this.object.registrar_connector_display},
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: RegistrarDetailsOverviewComponent,
          },
        ];
      case 'create':
        return [
          {
            tabName: 'Create',
            component: RegistrarEditFormComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: RegistrarEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
