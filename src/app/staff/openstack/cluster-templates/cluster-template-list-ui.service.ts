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
import { ClusterTemplateUiService } from './cluster-template-ui.service';
import { ClusterTemplatesApiService } from '@fleio-api/openstack/cluster-template/cluster-templates-api.service';
import { IClusterTemplateModel } from '@fleio-api/openstack/model/cluster-template.model';

@Injectable({
  providedIn: 'root'
})
export class ClusterTemplateListUiService implements IObjectListUIService {
  public noItemsMessage = 'No cluster templates';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private clusterTemplatesApiService: ClusterTemplatesApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ClusterTemplateUiService(
      object as IClusterTemplateModel, permissions, state, this.router, this.config, this.clusterTemplatesApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IClusterTemplateModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '1 0 90px', flexXs: '1 0 30px'
          },
          {
            type: ColumnType.Value, displayName: 'Created at', enableSort: true, fieldName: 'created_at',
            flex: '120px'
          },
          {
            type: ColumnType.Value, displayName: 'COE', enableSort: false, fieldName: 'coe',
            hide: {xs: true, sm: true, md: true}
          },
          {
            type: ColumnType.Value, displayName: 'Client', enableSort: false, fieldName: 'client',
            flex: '1 0 130px'
          },
          { type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)' },
        ],
        columnNames: ['name', 'created_at', 'coe', 'client', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const object of objectList.objects) {
      const rowUIService = this.getObjectUIService(object, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: object.name},
          created_at: {text: this.datePipe.transform(object.created_at, 'short')},
          coe: {text: object.coe},
          client: {text: object.client ? object.client.name : 'n/a' }
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
        name: 'Create cluster template',
        tooltip: 'Create cluster template',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/cluster-templates/create')
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
