import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { DatePipe } from '@angular/common';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { IObjectStatus } from '@objects-view/interfaces/object-status';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { IGatewayModel } from '@fleio-api/billing/model/gateway.model';
import { GatewayApiService } from '@fleio-api/billing/gateways/gateway-api.service';
import { GatewayEditFormComponent } from './tabs/gateway-edit-form/gateway-edit-form.component';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { CallbackAction } from '@objects-view/actions/callback-action';

export class GatewayUiService extends ObjectUIServiceBase<IGatewayModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly gatewayApiService: GatewayApiService;
  private readonly datePipe: DatePipe;

  constructor(
    gateway: IGatewayModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, gatewayApiService: GatewayApiService
  ) {
    super(gateway, permissions, state);
    this.router = router;
    this.config = config;
    this.gatewayApiService = gatewayApiService;
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
      case 'edit':
        return {
          text: `Edit gateway ${this.object.display_name}`,
        };

      default:
        return {
          text: `${this.object.display_name}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];
    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`billing/gateways`),
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
    return this.config.getPanelUrl(`billing/gateways/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {name: 'Enabled', value: this.object.enabled ? 'yes' : 'no'},
      {name: 'Show to user', value: this.object.visible_to_user ? 'yes' : 'no'},
      {name: 'Fixed fee', value: this.object.fixed_fee},
      {name: 'Percent fee', value: `${this.object.percent_fee}%`},
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: GatewayEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
