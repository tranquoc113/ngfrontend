import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { DatePipe } from '@angular/common';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';
import { ClusterTemplatesApiService } from '@fleio-api/openstack/cluster-template/cluster-templates-api.service';
import { ClusterTemplateDetailsInfoComponent } from '@shared/common-tabs/openstack/cluster-templates/cluster-template-details-info/cluster-template-details-info.component';
import { ClusterTemplateDetailsNodeSpecComponent } from '@shared/common-tabs/openstack/cluster-templates/cluster-template-details-node-spec/cluster-template-details-node-spec.component';
import { ClusterTemplateDetailsNetworkComponent } from '@shared/common-tabs/openstack/cluster-templates/cluster-template-details-network/cluster-template-details-network.component';
import { ClusterTemplateDetailsLabelsComponent } from '@shared/common-tabs/openstack/cluster-templates/cluster-template-details-labels/cluster-template-details-labels.component';
import { ClusterTemplateCreateFormComponent } from '@shared/common-tabs/openstack/cluster-templates/cluster-template-create-form/cluster-template-create-form.component';
import { ClusterDetailsAssignedFlavorsComponent } from './tabs/cluster-details-assigned-flavors/cluster-details-assigned-flavors.component';

export class ClusterTemplateUiService extends ObjectUIServiceBase<IClusterTemplateModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly clusterTemplatesApiService: ClusterTemplatesApiService;
  private readonly datePipe: DatePipe;

  constructor(
    object: IClusterTemplateModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, clusterTemplatesApiService: ClusterTemplatesApiService
  ) {
    super(object, permissions, state);
    this.router = router;
    this.config = config;
    this.clusterTemplatesApiService = clusterTemplatesApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    return {type: StatusType.None, value: StatusValue.None};
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'create':
        return {
          text: 'Create cluster template'
        }
      case 'details':
        return {
          text: this.object.name,
        }
      default:
        return {
          text: this.object.name,
          subText: this.object.id.toString(),
        }
    }
  }

  getActions(): IAction[] {
    return [
      new ApiCallAction({
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete cluster template',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete cluster template',
          message: `Are you sure?`,
        },
        successMessage: 'Cluster template delete queued',
        errorMessage: 'Failed to delete cluster template, check logs for details',
        apiService: this.clusterTemplatesApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: '/openstack/cluster-templates',
      })
    ];
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/cluster-templates`),
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

  getDetailsLink(): string {
    return this.config.getPanelUrl(`openstack/cluster-templates/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {
        name: 'Created at',
        value: this.datePipe.transform(this.object.created_at, 'short'),
      },
      {
        name: 'COE',
        value: this.object.coe
      }
    ] as Array<IDataField>;
    if (this.object.client) {
      fields.push({
        name: 'Client',
        value: this.object.client.name
      })
    }
    return fields;
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Info',
            component: ClusterTemplateDetailsInfoComponent
          },
          {
            tabName: 'Node spec',
            component: ClusterTemplateDetailsNodeSpecComponent,
          },
          {
            tabName: 'Network',
            component: ClusterTemplateDetailsNetworkComponent,
          },
          {
            tabName: 'Labels',
            component: ClusterTemplateDetailsLabelsComponent,
          },
          {
            tabName: 'Assigned flavors',
            component: ClusterDetailsAssignedFlavorsComponent,
            featureName: 'openstack.flavors'
          }
        ]
      case 'create':
        return [
          {
            tabName: 'Create',
            component: ClusterTemplateCreateFormComponent,
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
