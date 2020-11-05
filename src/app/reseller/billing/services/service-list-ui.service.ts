import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { ConfigService } from '@shared/config/config.service';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ServicesApiService } from '@fleio-api/billing/services/service-api.service';
import { ServiceUIService } from './service-ui.service';
import { IServiceModel } from '@fleio-api/billing/model/service.model';
import { IAction } from '@objects-view/interfaces/actions/action';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ServiceListUIService implements IObjectListUIService {
  public noItemsMessage = 'No services';
  private datePipe: DatePipe;

  constructor(private router: Router, private config: ConfigService, private servicesApiService: ServicesApiService,
              private matDialog: MatDialog) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ServiceUIService(
      object as IServiceModel, permissions, state, this.router, this.config, this.servicesApiService, this.matDialog,
    );
  }

  getTableData(objectList: FleioObjectsList<IServiceModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '300px', flexXs: '250px',
          },
          {
            type: ColumnType.Value, displayName: 'Client', enableSort: true, fieldName: 'client',
            flex: '150px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Created at', enableSort: true, fieldName: 'created_at',
            flex: '100px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Current cycle end', enableSort: true,
            fieldName: 'current_service_cycle_end',
            flex: '150px', flexXs: 'auto',
          },
          {
            type: ColumnType.Value, displayName: 'Status', enableSort: true, fieldName: 'status',
            flex: '100px', hide: {xs: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: true, fieldName: '(actions)',
            hide: {xs: true},
          },
        ],
        columnNames: ['name', 'client', 'created_at', 'current_service_cycle_end', 'status', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const service of objectList.objects) {
      const rowUIService = this.getObjectUIService(service, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: service.display_name},
          client: {
            text: service.client.name,
            url: this.config.getPanelUrl(`clients-users/clients/${service.client.id}`)
          },
          created_at: {text: this.datePipe.transform(service.created_at)},
          current_service_cycle_end: {text: this.datePipe.transform(service.current_service_cycle_end)},
          status: {text: service.status.toLocaleUpperCase()},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: service,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return null;
  }

  getRefreshInterval(): number {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      return this.config.current.settings.refreshIntervals.defaultInterval;
    }
    return 10000;
  }
}
