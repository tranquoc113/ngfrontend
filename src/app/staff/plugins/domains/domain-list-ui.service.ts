import { Injectable } from '@angular/core';
import { IObjectListUIService } from '../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../shared/config/config.service';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '../../../shared/ui/objects-view/interfaces/object-ui-service';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { ITableData } from '../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { ColumnType } from '../../../shared/ui/objects-view/interfaces/table-data/column-definition';
import { RouterLinkAction } from '../../../shared/ui/objects-view/actions/router-link-action';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { ITableRow } from '../../../shared/ui/objects-view/interfaces/table-data/table-row';
import { DatePipe } from '@angular/common';
import { DomainApiService } from '../../../shared/fleio-api/plugins/domains/domain-api.service';
import { DomainUiService } from './domain-ui.service';
import { IDomainModel } from '../../../shared/fleio-api/plugins/domains/model/domain.model';

@Injectable({
  providedIn: 'root'
})
export class DomainListUiService implements IObjectListUIService {
  public noItemsMessage = 'No domainss';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private domainApiService: DomainApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new DomainUiService(
      object as IDomainModel, permissions, state, this.router, this.config, this.domainApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IDomainModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '400px', flexXs: '80',
          },
          {
            type: ColumnType.Value, displayName: 'Created at', enableSort: true, fieldName: 'created_at',
            flex: '180px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Status', enableSort: true, fieldName: 'status',
            hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['name', 'created_at', 'status', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const domain of objectList.objects) {
      const rowUIService = this.getObjectUIService(domain, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: domain.name},
          created_at: {text: this.datePipe.transform(domain.created_at, 'medium')},
          status: {text: domain.status_display},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: domain,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [];
  }

  getRefreshInterval(): number {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      return this.config.current.settings.refreshIntervals.defaultInterval;
    }
    return 10000;
  }
}
