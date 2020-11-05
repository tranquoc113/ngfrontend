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
import { IClientModel } from '@fleio-api/client-user/model/client.model';
import { ClientsApiService } from '@fleio-api/client-user/client/clients-api.service';
import { ClientUIService } from './client-ui.service';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ClientListUIService implements IObjectListUIService {
  public noItemsMessage = 'No clients';
  private readonly datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService, private clientsApi: ClientsApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ClientUIService(
      object as IClientModel, permissions, state, this.router, this.config, this.clientsApi,
    );
  }

  getTableData(objectList: FleioObjectsList<IClientModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Image, displayName: '', enableSort: false, fieldName: '(image)',
            flex: '50px',
          },
          {
            type: ColumnType.Value, displayName: 'ID', enableSort: false, fieldName: 'id',
            flex: '70px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: false, fieldName: 'name',
            flex: '1 1 350px', flexXs: '95%',
          },
          {
            type: ColumnType.Value, displayName: 'Up to date credit', enableSort: true, fieldName: 'uptodate_credit',
            flex: '140px', hide: {sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Out of credit', enableSort: false, fieldName: 'outofcredit_datetime',
            flex: '100px', hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Value, displayName: 'Configuration', enableSort: true, fieldName: 'configuration_name',
            flex: '100px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Group', enableSort: true, fieldName: 'group_name',
            flex: '100px', hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Value, displayName: 'Company', enableSort: true, fieldName: 'company',
            flex: '80px', hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
            flex: 'auto', hide: {xs: true},
          },
        ],
        columnNames: [
          '(image)', 'id', 'name', 'uptodate_credit', 'outofcredit_datetime', 'configuration_name',
          'group_name', 'company', '(actions)',
        ],
        showStatus: true,
      },
      rows: [],
    };

    for (const client of objectList.objects) {
      const rowUIService = this.getObjectUIService(client, objectList.permissions, 'uptodate_credit');
      // TODO: add table row class that performs icon/status/url/actions initialization
      const row: ITableRow = {
        cells: {
          id: {text: `${client.id}`},
          name: {text: client.name},
          uptodate_credit: {text: `${client.uptodate_credit ? client.uptodate_credit : 0} ${client.currency}`},
          outofcredit_datetime: {
            text: client.outofcredit_datetime ? this.datePipe.transform(client.outofcredit_datetime) : 'n/a',
          },
          configuration_name: {text: client.configuration_name},
          group_name: {text: client.group_name || 'n/a'},
          company: {text: client.company},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        url: rowUIService.getDetailsLink(),
        actions: rowUIService.getActions(),
        object: client,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Send mass mail to filtered clients',
        tooltip: 'Send mass mail to filtered clients',
        icon: {name: 'mail'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('clients-users/clients/send-mass-email')
      }),
      new RouterLinkAction({
        name: 'Create new client',
        tooltip: 'Create new client',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('clients-users/clients/create')
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
