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
import { FlavorsApiService } from '@fleio-api/openstack/flavor/flavors-api.service';
import { IFlavorModel } from '@fleio-api/openstack/model/flavor.model';
import { FlavorUiService } from './flavor-ui.service';

@Injectable({
  providedIn: 'root'
})
export class FlavorListUIService implements IObjectListUIService {
  public noItemsMessage = 'No flavors';

  constructor(
    private router: Router, private config: ConfigService,
    private flavorsApiService: FlavorsApiService,
  ) {
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new FlavorUiService(
      object as IFlavorModel, permissions, state, this.router, this.config, this.flavorsApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IFlavorModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
          },
          {
            type: ColumnType.Value, displayName: 'Region', enableSort: true, fieldName: 'region',
            hide: {xs: true},
          },
          {
            type: ColumnType.Value, displayName: 'vCPUs', enableSort: true, fieldName: 'vcpus',
            hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Memory', enableSort: true, fieldName: 'memory_mb',
            hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Root', enableSort: true, fieldName: 'root_gb',
            hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Labels', enableSort: false, fieldName: 'tags',
            hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Value, displayName: 'Description', enableSort: false, fieldName: 'description',
            hide: {xs: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['name', 'region', 'vcpus', 'memory_mb', 'root_gb', 'tags', 'description', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const flavor of objectList.objects) {
      const rowUIService = this.getObjectUIService(
        flavor, objectList.permissions, 'table-view'
      ) as FlavorUiService;

      const row: ITableRow = {
        cells: {
          name: {text: flavor.name},
          region: {text: flavor.region},
          vcpus: {text: `${flavor.vcpus} vCPUs`},
          memory_mb: {text: `${flavor.memory_mb} MB`},
          root_gb: {text: `${flavor.root_gb} GB`},
          tags: {tags: rowUIService.getCardTags()},
          description: {text: flavor.description},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: flavor,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new flavor',
        tooltip: 'Create new flavor',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/flavors/create')
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
