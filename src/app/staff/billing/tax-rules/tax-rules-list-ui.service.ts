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
import { IAction } from '@objects-view/interfaces/actions/action';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@shared/ui-api/notification.service';
import { TaxRulesApiService } from '@fleio-api/billing/tax-rules/tax-rules-api.service';
import { TaxRuleUIService } from './tax-rule-ui.service';
import { ITaxRuleModel } from '@fleio-api/billing/model/tax-rule.model';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';

@Injectable({
  providedIn: 'root',
})
export class TaxRulesListUiService implements IObjectListUIService {
  public noItemsMessage = 'No tax rules';
  private datePipe: DatePipe;

  constructor(
    private router: Router,
    private config: ConfigService,
    private taxRulesApiService: TaxRulesApiService,
    private matDialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new TaxRuleUIService(
      object as ITaxRuleModel, permissions, state, this.router, this.config, this.taxRulesApiService,
      this.matDialog, this.notificationService
    );
  }

  getTableData(objectList: FleioObjectsList<ITaxRuleModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: false, fieldName: 'name',
            flex: '200px',
          },
          {
            type: ColumnType.Value, displayName: 'Level', enableSort: true, fieldName: 'level',
            flex: '70px', hide: { xs: true}
          },
          {
            type: ColumnType.Value, displayName: 'Country', enableSort: true, fieldName: 'country',
            flex: '130px',
          },
          {
            type: ColumnType.Value, displayName: 'State', enableSort: true, fieldName: 'state',
            hide: { xs: true}
          },
          {
            type: ColumnType.Value, displayName: 'Rate', enableSort: true, fieldName: 'rate',
            hide: { xs: true, sm: true}
          },
          {
            type: ColumnType.Value, displayName: 'Start date', enableSort: true, fieldName: 'start_date',
            hide: { xs: true, sm: true}
          },
          {
            type: ColumnType.Value, displayName: 'End date', enableSort: true, fieldName: 'end_date',
            hide: { xs: true, sm: true}
          },
          {
            type: ColumnType.Actions, displayName: '', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['name', 'level', 'country', 'state', 'rate', 'start_date', 'end_date', '(actions)'],
        showStatus: false,
      },
      rows: [],
    };

    for (const object of objectList.objects) {
      const rowUIService = this.getObjectUIService(object, objectList.permissions, 'table-view');
      let endDate = '';
      if (object.end_date) {
        endDate = this.datePipe.transform(object.end_date);
      }
      let startDate = '';
      if (object.start_date) {
        startDate = this.datePipe.transform(object.start_date);
      }
      const row: ITableRow = {
        cells: {
          name: {text: object.name},
          level: {text: object.level.toString()},
          country: {text: object.country},
          state: {text: object.state},
          rate: {text: object.rate.toString()},
          start_date: {text: startDate},
          end_date: {text: endDate},
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
        icon: {name: 'add'},
        name: 'Create',
        tooltip: 'Create new tax rule',
        routerUrl: this.config.getPanelUrl(`billing/tax-rules/create`),
        router: this.router,
      }),
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
