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
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';
import { ClustersApiService } from '@fleio-api/openstack/cluster/clusters-api.service';
import { ClusterDetailsInfoComponent } from '@shared/common-tabs/openstack/clusters/cluster-details-info/cluster-details-info.component';
import { ClusterDetailsNodesComponent } from '@shared/common-tabs/openstack/clusters/cluster-details-nodes/cluster-details-nodes.component';
import { ClusterDetailsMiscellaneousComponent } from '@shared/common-tabs/openstack/clusters/cluster-details-miscellaneous/cluster-details-miscellaneous.component';
import { ClusterDetailsLabelsComponent } from '@shared/common-tabs/openstack/clusters/cluster-details-labels/cluster-details-labels.component';
import { of } from 'rxjs';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { ClusterResizeFormComponent } from '@shared/common-tabs/openstack/clusters/cluster-resize-form/cluster-resize-form.component';
import { ClusterCreateFormComponent } from '@shared/common-tabs/openstack/clusters/cluster-create-form/cluster-create-form.component';
import { ClusterUpgradeFormComponent } from '@shared/common-tabs/openstack/clusters/cluster-upgrade-form/cluster-upgrade-form.component';

export class ClusterUiService extends ObjectUIServiceBase<IClusterModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly clustersApiService: ClustersApiService;
  private readonly datePipe: DatePipe;

  constructor(
    object: IClusterModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, clustersApiService: ClustersApiService
  ) {
    super(object, permissions, state);
    this.router = router;
    this.config = config;
    this.clustersApiService = clustersApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    if (this.state === 'resize' || this.state === 'upgrade' || this.state === 'create') {
      return {type: StatusType.None, value: StatusValue.None};
    }
    if (this.object.under_task) {
      return {type: StatusType.Changing, value: StatusValue.Pending}
    } else {
      const status = this.object.status.toUpperCase();
      if (['CREATE_COMPLETE', 'UPDATE_COMPLETE', 'RESUME_COMPLETE', 'RESTORE_COMPLETE', 'ROLLBACK_COMPLETE',
        'SNAPSHOT_COMPLETE', 'CHECK_COMPLETE', 'ADOPT_COMPLETE'].indexOf(status) > -1) {
        return {type: StatusType.Defined, value: StatusValue.Active};
      } else if (['CREATE_FAILED', 'UPDATE_FAILED', 'DELETE_FAILED', 'ROLLBACK_FAILED',
        'RESUME_FAILED'].indexOf(status) > -1) {
        return {type: StatusType.Defined, value: StatusValue.Error};
      } else {
        return {type: StatusType.Defined, value: StatusValue.Pending};
      }
    }
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'create':
        return {
          text: 'Create cluster'
        }
      case 'resize':
        let objTitle: string;
        if (this.object.name) {
          objTitle = this.object.name;
        } else {
          objTitle = this.object.id as string;
        }
        return {
          text: `Resize ${objTitle}`
        }
      case 'upgrade':
        let objTitleUpgrade: string;
        if (this.object.name) {
          objTitleUpgrade = this.object.name;
        } else {
          objTitleUpgrade = this.object.id as string;
        }
        return {
          text: `Upgrade ${objTitleUpgrade}`
        }
      default:
        let title: string;
        if (this.object.name) {
          title = this.object.name;
        } else {
          title = this.object.id as string;
        }
        return {
          text: title,
          subText: this.object.display_status,
        };
    }
  }

  getActions(): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Resize',
        tooltip: 'Resize',
        icon: {name: 'resize', class: 'fl-icons'},
        router: this.router,
        routerUrl: this.config.getPanelUrl(`openstack/clusters/${this.object.id}/resize`)
      }),
      new RouterLinkAction({
        name: 'Upgrade',
        tooltip: 'Upgrade',
        icon: {name: 'arrow_circle_up'},
        router: this.router,
        routerUrl: this.config.getPanelUrl(`openstack/clusters/${this.object.id}/upgrade`)
      }),
      new CallbackAction({
        object: this.object,
        tooltip: 'Get configuration',
        icon: {name: 'file_copy'},
        name: 'Get configuration',
        callback: action => {
          window.open(
            this.config.getPanelApiUrl(`openstack/clusters/${this.object.id}/get_configuration`),
            '_blank'
          );
          return of(null);
      }}),
      new CallbackAction({
        object: this.object,
        tooltip: 'Get certificate',
        icon: {name: 'description'},
        name: 'Get certificate',
        callback: action => {
          window.open(
            this.config.getPanelApiUrl(`openstack/clusters/${this.object.id}/get_certificate`),
            '_blank'
          );
          return of(null);
      }}),
      new ApiCallAction({
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete cluster',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete cluster',
          message: `Are you sure?`,
        },
        successMessage: 'Cluster delete queued',
        errorMessage: 'Failed to delete cluster, check logs for details',
        apiService: this.clustersApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: '/openstack/clusters',
      })
    ];
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/clusters`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create'}));
        break;
      case 'resize':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/clusters`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Resize'}));
        break;
      case 'upgrade':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`openstack/clusters`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Upgrade'}));
        break;
      default:
        break;
    }

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`openstack/clusters/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const fields = [
      {
        name: 'ID',
        value: this.object.id,
      },
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
            component: ClusterDetailsInfoComponent,
            tabName: 'Info'
          },
          {
            component: ClusterDetailsNodesComponent,
            tabName: 'Nodes'
          },
          {
            component: ClusterDetailsMiscellaneousComponent,
            tabName: 'Miscellaneous'
          },
          {
            component: ClusterDetailsLabelsComponent,
            tabName: 'Labels'
          }
        ]
      case 'resize':
        return [
          {
            component: ClusterResizeFormComponent,
            tabName: 'Resize'
          }
        ]
      case 'upgrade':
        return [
          {
            component: ClusterUpgradeFormComponent,
            tabName: 'Upgrade'
          }
        ]
      case 'create':
        return [
          {
            component: ClusterCreateFormComponent,
            tabName: 'Create'
          }
        ]
      default:
        return [];
    }
  }

  getCardTags(): string[] {
    const tags = [];
    return tags;
  }
}
