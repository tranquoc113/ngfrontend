import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { ITLDModel } from '@fleio-api/plugins/domains/model/tld.model';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { TLDsApiService } from '@fleio-api/plugins/domains/tlds-api.service';
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
import { TldEditFormComponent } from './tabs/tld-edit-form/tld-edit-form.component';
import { TldPricingComponent } from './tabs/tld-pricing/tld-pricing.component';
import { TldAddonsPricingComponent } from './tabs/tld-addons-pricing/tld-addons-pricing.component';
import { TldRegistrarsComponent } from './tabs/tld-registrars/tld-registrars.component';
import { TldCostPricingComponent } from './tabs/tld-cost-pricing/tld-cost-pricing.component';
import { TldCustomFieldsComponent } from './tabs/tld-custom-fields/tld-custom-fields.component';

export class TLDUiService extends ObjectUIServiceBase<ITLDModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly tldsApiService: TLDsApiService;
  private readonly datePipe: DatePipe;


  constructor(
    tld: ITLDModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, tldsApiService: TLDsApiService
  ) {
    super(tld, permissions, state);
    this.router = router;
    this.config = config;
    this.tldsApiService = tldsApiService;
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
          text: `TLD ${this.object.name}`,
        };

      case 'create':
        return {
          text: `Create new TLD`,
        };

      default:
        return {
          text: `${this.object.name}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    const deleteAction = new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete TLD',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete TLD',
          message: `Are you sure you want to delete TLD ${this.object.name}`,
        },
        successMessage: 'TLD deleted',
        errorMessage: 'Failed to delete TLD, check logs for details',
        apiService: this.tldsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: '/plugins/domains/tlds',
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
            routerUrl: this.config.getPrevUrl(`plugins/domains/tlds`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`plugins/domains/tlds`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Save'}));
        break;
      case 'details':
        actions.push(new RouterLinkAction({
            name: 'Back',
            routerUrl: this.config.getPrevUrl(`plugins/domains/tlds`),
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
    return this.config.getPanelUrl(`plugins/domains/tlds/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {name: 'Created at', value: this.datePipe.transform(this.object.created_at, 'medium')},
      {name: 'Premium domains available', value: this.object.premium_domains_available ? 'Yes' : 'No'},
      {name: 'Whois server configured', value: this.object.whois_server_configured ? 'Yes' : 'No'},
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Pricing',
            component: TldPricingComponent,
          },
          {
            tabName: 'Addons pricing',
            component: TldAddonsPricingComponent,
          },
          {
            tabName: 'Registrars',
            component: TldRegistrarsComponent,
          },
          {
            tabName: 'Cost pricing',
            component: TldCostPricingComponent,
          },
          {
            tabName: 'Custom fields',
            component: TldCustomFieldsComponent,
          },
        ];
      case 'create':
        return [
          {
            tabName: 'Create',
            component: TldEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
