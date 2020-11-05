import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
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
import { SecurityGroupsApiService } from '@fleio-api/openstack/security-groups/security-groups-api.service';
import { ISecurityGroupModel } from '@fleio-api/openstack/model/security-group.model';
import { SecurityGroupEditFormComponent } from '@shared/common-tabs/openstack/security-groups/security-group-create-form/security-group-edit-form.component';
import { SecurityGroupsDetailsOverviewComponent } from '@shared/common-tabs/openstack/security-groups/security-groups-details-overview/security-groups-details-overview.component';
import { SecurityGroupAddRuleFormComponent } from '@shared/common-tabs/openstack/security-groups/security-group-add-rule-form/security-group-add-rule-form.component';

export class SecurityGroupsUiService extends ObjectUIServiceBase<ISecurityGroupModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly securityGroupsApiService: SecurityGroupsApiService;
  private readonly datePipe: DatePipe;

  constructor(
    object: ISecurityGroupModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, securityGroupsApiService: SecurityGroupsApiService
  ) {
    super(object, permissions, state);
    this.router = router;
    this.config = config;
    this.securityGroupsApiService = securityGroupsApiService;
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
          text: `Edit security group ${this.object.name || this.object.id}`,
        };

      case 'add-rule':
        return {
          text: `Add rule for ${this.object.name || this.object.id}`,
        }

      case 'create':
        return {
          text: `Create security group`,
        };

      default:
        return {
          text: `${this.object.name || this.object.id}`,
          subText: this.object.description
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit security groups',
        routerUrl: this.config.getPanelUrl(`openstack/security-groups/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    actions.push(new RouterLinkAction({
        icon: {name: 'playlist_add'},
        name: 'Add rule',
        tooltip: 'Add rule',
        routerUrl: this.config.getPanelUrl(`openstack/security-groups/${this.object.id}/add-rule`),
        router: this.router,
      }
    ));

    const deleteAction = new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete security group',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete security group',
          message: `Are you sure you want to delete security group ${this.object.name || this.object.id}`,
        },
        successMessage: 'Security group delete queued',
        errorMessage: 'Failed to delete security group, check logs for details',
        apiService: this.securityGroupsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: '/openstack/security-groups',
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
            routerUrl: this.config.getPrevUrl(`openstack/security-groups`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'add-rule':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/security-groups/${this.object.id}`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Add rule'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/security-groups`),
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
    return this.config.getPanelUrl(`openstack/security-groups/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    let instancesText = '';
    for (const instance of this.object.associated_instances) {
      if (instancesText) {
        instancesText += ', ';
      }
      instancesText += (instance.name || instance.id);
    }
    const fields = [
      {name: 'Region', value: this.object.region},
      {name: 'Project', value: this.object.project}
    ] as IDataField[];
    if (instancesText) {
      fields.push({name: 'Instances', value: instancesText});
    }
    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'create':
        return [
          {
            tabName: 'Create',
            component: SecurityGroupEditFormComponent
          }
        ]
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: SecurityGroupEditFormComponent
          }
        ]
      case 'add-rule':
        return [
          {
            tabName: 'Add rule',
            component: SecurityGroupAddRuleFormComponent,
          }
        ]
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: SecurityGroupsDetailsOverviewComponent,
          }
        ]
      default:
        return [];
    }
  }

  getCardTags(): string[] {
    return [];
  }
}
