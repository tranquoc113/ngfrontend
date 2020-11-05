import { Injectable } from '@angular/core';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { DatePipe } from '@angular/common';
import { ConfigService } from '@shared/config/config.service';
import { Router } from '@angular/router';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { ClustersApiService } from '@fleio-api/openstack/cluster/clusters-api.service';
import { ClusterUiService } from './cluster-ui.service';
import { IClusterModel } from '@fleio-api/openstack/model/cluster.model';

@Injectable({
  providedIn: 'root'
})
export class ClusterListUiService implements IObjectListUIService {
  public noItemsMessage = 'No clusters';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private clustersApiService: ClustersApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ClusterUiService(
      object as IClusterModel, permissions, state, this.router, this.config, this.clustersApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IClusterModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name', flex: '1 0 180px',
            flexXs: '110px'
          },
          {
            type: ColumnType.Value, displayName: 'Status', enableSort: true, fieldName: 'display_status',
             hide: {xs: true, sm: true}
          },
          {
            type: ColumnType.Value, displayName: 'Cluster template', enableSort: false, fieldName: 'cluster_template',
             hide: {sm: true, xs: true}
          },
          {
            type: ColumnType.Value, displayName: 'Client', enableSort: false, fieldName: 'client',
          },
          { type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)' },
        ],
        columnNames: ['name', 'display_status', 'cluster_template', 'client', '(actions)'],
        showStatus: true,
        visibleActions: 3,
      },
      rows: [],
    };

    for (const object of objectList.objects) {
      const rowUIService = this.getObjectUIService(object, objectList.permissions, 'table-view');
      let template = '';
      if (object.cluster_template) {
        template = object.cluster_template.name || object.cluster_template.id as string;
      } else {
        template = 'n/a';
      }
      let client = '';
      if (object.client) {
        client = object.client.name || object.client.id as string;
      } else {
        client = 'n/a';
      }
      const row: ITableRow = {
        cells: {
          name: {text: object.name},
          display_status: {text: object.display_status},
          cluster_template: {text: template},
          client: {text: client},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create cluster',
        tooltip: 'Create cluster',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/clusters/create')
      })
    ];
  }

  getRefreshInterval(): number {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      return this.config.current.settings.refreshIntervals.defaultInterval;
    }
    return 10000;
  }
}
