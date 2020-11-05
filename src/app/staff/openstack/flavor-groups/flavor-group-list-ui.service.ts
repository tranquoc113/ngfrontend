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
import { FlavorGroupsApiService } from '@fleio-api/openstack/flavor-group/flavor-groups-api.service';
import { FlavorGroupUiService } from './flavor-group-ui.service';
import { IFlavorGroupModel } from '@fleio-api/openstack/model/flavor-group.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlavorGroupListUiService implements IObjectListUIService {
  public noItemsMessage = 'No flavor groups';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private flavorGroupsApiService: FlavorGroupsApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new FlavorGroupUiService(
      object as IFlavorGroupModel, permissions, state, this.router, this.config, this.flavorGroupsApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IFlavorGroupModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '200px', flexXs: '70%',
          },
          {
            type: ColumnType.Value, displayName: 'Created at', enableSort: false, fieldName: 'created_at',
            flex: '180px', hide: {xs: true},
          },
          {
            type: ColumnType.Value, displayName: 'Description', enableSort: false, fieldName: 'description',
            hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['name', 'created_at', 'description', '(actions)'],
        showStatus: false,
      },
      rows: [],
    };

    for (const flavorGroup of objectList.objects) {
      const rowUIService = this.getObjectUIService(
        flavorGroup, objectList.permissions, 'table-view'
      ) as FlavorGroupUiService;

      const row: ITableRow = {
        cells: {
          name: {text: flavorGroup.name},
          created_at: {text: this.datePipe.transform(flavorGroup.created_at, 'medium')},
          description: {text: flavorGroup.description},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: flavorGroup,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new flavor group',
        tooltip: 'Create new flavor group',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/flavor-groups/create'),
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
