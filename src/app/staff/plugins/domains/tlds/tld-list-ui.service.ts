import { Injectable } from '@angular/core';
import { IObjectListUIService } from '../../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../shared/config/config.service';
import { TLDsApiService } from '../../../../shared/fleio-api/plugins/domains/tlds-api.service';
import { IBaseFleioObjectModel } from '../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../../../shared/fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '../../../../shared/ui/objects-view/interfaces/object-ui-service';
import { TLDUiService } from './tld-ui.service';
import { ITLDModel } from '../../../../shared/fleio-api/plugins/domains/model/tld.model';
import { FleioObjectsList } from '../../../../shared/fleio-api/fleio-objects-list';
import { ITableData } from '../../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { ColumnType } from '../../../../shared/ui/objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '../../../../shared/ui/objects-view/interfaces/table-data/table-row';
import { IAction } from '../../../../shared/ui/objects-view/interfaces/actions/action';
import { RouterLinkAction } from '../../../../shared/ui/objects-view/actions/router-link-action';

@Injectable({
  providedIn: 'root'
})
export class TLDListUiService implements IObjectListUIService {
  public noItemsMessage = 'No TLDs';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private tldsApiService: TLDsApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new TLDUiService(
      object as ITLDModel, permissions, state, this.router, this.config, this.tldsApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<ITLDModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '30', flexXs: '60',
          },
          {
            type: ColumnType.Value, displayName: 'Premium domains', enableSort: true,
            fieldName: 'premium_domains_available', hide: {xs: true, sm: true},
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
        columnNames: ['name', 'premium_domains_available', 'created_at', 'updated_at', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const tld of objectList.objects) {
      const rowUIService = this.getObjectUIService(tld, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: tld.name},
          premium_domains_available: {text: tld.premium_domains_available ? 'Yes' : 'No'},
          created_at: {text: this.datePipe.transform(tld.created_at, 'medium')},
          updated_at: {text: this.datePipe.transform(tld.updated_at, 'medium')},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: tld,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new TLD',
        tooltip: 'Create new TLD',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('plugins/domains/tlds/create')
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
