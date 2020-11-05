import { Injectable } from '@angular/core';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { SecurityGroupsUiService } from './security-groups-ui.service';
import { DatePipe } from '@angular/common';
import { SecurityGroupsApiService } from '@fleio-api/openstack/security-groups/security-groups-api.service';
import { ISecurityGroupModel } from '@fleio-api/openstack/model/security-group.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityGroupsListUiService implements IObjectListUIService {
  public noItemsMessage = 'No security groups';

  private readonly datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private securityGroupsApiService: SecurityGroupsApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new SecurityGroupsUiService(
      object as ISecurityGroupModel, permissions, state, this.router, this.config, this.securityGroupsApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<ISecurityGroupModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '1 0 90px', flexXs: '120px'
          },
          {
            type: ColumnType.Value, displayName: 'Created at', enableSort: true, fieldName: 'created_at',
            hide: {xs: true, sm: true, md: true}
          },
          {
            type: ColumnType.Value, displayName: 'Description', enableSort: false, fieldName: 'description',
            flex: '1 0 120px', hide: {xs: true, sm: true}
          },
          {
            type: ColumnType.Value, displayName: 'Region', enableSort: true, fieldName: 'region',
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['name', 'created_at', 'description', 'region', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const object of objectList.objects) {
      const rowUIService = this.getObjectUIService(object, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: object.name || object.id.toString()},
          created_at: {text: `${this.datePipe.transform(object.created_at, 'short')}`},
          description: {text: object.description},
          region: {text: object.region}
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
        name: 'Create new security group',
        tooltip: 'Create new security group',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/security-groups/create')
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
