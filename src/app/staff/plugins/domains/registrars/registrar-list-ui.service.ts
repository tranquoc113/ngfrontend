import { Injectable } from '@angular/core';
import { IObjectListUIService } from '../../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../shared/config/config.service';
import { DomainRegistrarsApiService } from '../../../../shared/fleio-api/plugins/domains/domain-registrars-api.service';
import { IBaseFleioObjectModel } from '../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../../../shared/fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '../../../../shared/ui/objects-view/interfaces/object-ui-service';
import { RegistrarUiService } from './registrar-ui.service';
import { IDomainRegistrarModel } from '../../../../shared/fleio-api/plugins/domains/model/domain-registrar.model';
import { FleioObjectsList } from '../../../../shared/fleio-api/fleio-objects-list';
import { ITableData } from '../../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { ColumnType } from '../../../../shared/ui/objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '../../../../shared/ui/objects-view/interfaces/table-data/table-row';
import { IAction } from '../../../../shared/ui/objects-view/interfaces/actions/action';
import { RouterLinkAction } from '../../../../shared/ui/objects-view/actions/router-link-action';

@Injectable({
  providedIn: 'root'
})
export class RegistrarListUiService implements IObjectListUIService {
  public noItemsMessage = 'No registrars';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private domainRegistrarsApiService: DomainRegistrarsApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new RegistrarUiService(
      object as IDomainRegistrarModel, permissions, state, this.router, this.config, this.domainRegistrarsApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IDomainRegistrarModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
          },
          {
            type: ColumnType.Value, displayName: 'Registrar connector', enableSort: true, fieldName: 'connector',
            hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Created at', enableSort: true, fieldName: 'created_at',
            hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Updated at', enableSort: true, fieldName: 'updated_at',
            hide: 'xs',
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['name', 'connector', 'created_at', 'updated_at', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const registrar of objectList.objects) {
      const rowUIService = this.getObjectUIService(registrar, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: registrar.display_name},
          connector: {text: registrar.registrar_connector_display},
          created_at: {text: this.datePipe.transform(registrar.created_at, 'medium')},
          updated_at: {text: this.datePipe.transform(registrar.updated_at, 'medium')},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: registrar,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new registrar',
        tooltip: 'Create new registrar',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('plugins/domains/registrars/create')
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
