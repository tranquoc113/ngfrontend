import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IObjectListUIService } from '../../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { ConfigService } from '../../../../shared/config/config.service';
import { IBaseFleioObjectModel } from '../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../../../shared/fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '../../../../shared/ui/objects-view/interfaces/object-ui-service';
import { FleioObjectsList } from '../../../../shared/fleio-api/fleio-objects-list';
import { ITableData } from '../../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { ColumnType } from '../../../../shared/ui/objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '../../../../shared/ui/objects-view/interfaces/table-data/table-row';
import { RouterLinkAction } from '../../../../shared/ui/objects-view/actions/router-link-action';
import { IAction } from '../../../../shared/ui/objects-view/interfaces/actions/action';
import { MatDialog } from '@angular/material/dialog';
import { PricingRuleUIService } from './pricing-rule-ui.service';
import { IPricingRuleModel } from '../../../../shared/fleio-api/openstack/model/pricing-rule.model';
import { PricingRulesApiService } from '../../../../shared/fleio-api/openstack/pricing-rule/pricing-rules-api.service';

@Injectable({
  providedIn: 'root',
})
export class PricingRuleListUIService implements IObjectListUIService {
  public noItemsMessage = 'No pricing rules';

  constructor(
    private router: Router, private config: ConfigService,
    private pricingRulesApiService: PricingRulesApiService,
    private matDialog: MatDialog,
    ) {
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
      return new PricingRuleUIService(
        object as IPricingRuleModel, permissions, state, this.router, this.config, this.pricingRulesApiService,
        this.matDialog,
      );
  }

  getTableData(objectList: FleioObjectsList<IPricingRuleModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          { type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'display_name' },
        ],
        columnNames: [ 'display_name' ],
        showStatus: true,
      },
      rows: [],
    };

    for (const rule of objectList.objects) {
      const row: ITableRow = {
        cells: {
          name: { text: rule.display_name},
        },
      };

      const rowUIService = this.getObjectUIService(rule, objectList.permissions, 'table-view');

      row.icon = rowUIService.getIcon();
      row.status = rowUIService.getStatus();
      row.object = rule;

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new pricing rule',
        tooltip: 'Create new pricing rule',
        icon: { name: 'add' },
        router: this.router,
        routerUrl: this.config.getPanelUrl('settings/pricing-rules/create')
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
