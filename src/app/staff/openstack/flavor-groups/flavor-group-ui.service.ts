import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { ConfigService } from '@shared/config/config.service';
import { DatePipe } from '@angular/common';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { IObjectStatus } from '@objects-view/interfaces/object-status';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { IFlavorGroupModel } from '@fleio-api/openstack/model/flavor-group.model';
import { Router } from '@angular/router';
import { FlavorGroupsApiService } from '@fleio-api/openstack/flavor-group/flavor-groups-api.service';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { FlavorGroupEditFormComponent } from './tabs/flavor-group-edit-form/flavor-group-edit-form.component';
import { FlavorGroupDetailsOverviewComponent } from './tabs/flavor-group-details-overview/flavor-group-details-overview.component';

export class FlavorGroupUiService extends ObjectUIServiceBase<IFlavorGroupModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly flavorGroupsApiService: FlavorGroupsApiService;
  private readonly datePipe: DatePipe;

  constructor(
    flavorGroupModel: IFlavorGroupModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, flavorGroupsApiService: FlavorGroupsApiService,
  ) {
    super(flavorGroupModel, permissions, state);
    this.router = router;
    this.config = config;
    this.flavorGroupsApiService = flavorGroupsApiService;
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
          text: `Edit flavor group ${this.object.name}`,
        };

      case 'create':
        return {
          text: `Create new flavor group`,
        };

      case 'details':
        return {
          text: `${this.object.name}`,
          subText: `Created at ${this.datePipe.transform(this.object.created_at, 'medium')}`,
        };

      default:
        return {
          text: `${this.object.name}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit flavor group',
        routerUrl: this.config.getPanelUrl(`openstack/flavor-groups/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    const deleteAction = new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete flavor group',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete flavor group',
          message: `Are you sure you want to delete flavor group ${this.object.name}`,
        },
        successMessage: 'Flavor group deleted',
        errorMessage: 'Failed to delete flavor group, check logs for details',
        apiService: this.flavorGroupsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: 'openstack/flavor-groups',
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
            routerUrl: this.config.getPrevUrl(`openstack/flavor-groups`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/flavor-groups`),
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
    return this.config.getPanelUrl(`openstack/flavor-groups/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {value: `${this.object.flavor_count} flavors in this group`},
      {name: 'Created at', value: this.datePipe.transform(this.object.created_at, 'medium')},
      {name: 'Description', value: this.object.description || 'n/a'},
    ];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'create':
        return [
          {
            tabName: 'Create',
            component: FlavorGroupEditFormComponent,
          },
        ];
      case 'details':
        return [
          {
            tabName: 'Create',
            component: FlavorGroupDetailsOverviewComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: FlavorGroupEditFormComponent,
          },
        ];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
