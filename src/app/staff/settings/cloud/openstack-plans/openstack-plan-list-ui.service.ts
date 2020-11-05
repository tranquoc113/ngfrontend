import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PricingPlansApiService } from '../../../../shared/fleio-api/openstack/pricing-plan/pricing-plans-api.service';
import { PricingPlanUIService } from './openstack-plan-ui.service';
import { IPricingPlanModel } from '../../../../shared/fleio-api/openstack/model/pricing-plan.model';
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

@Injectable({
  providedIn: 'root',
})
export class PricingPlanListUIService implements IObjectListUIService {
  public noItemsMessage = 'No OpenStack plans';

  constructor(
    private router: Router, private config: ConfigService,
    private pricingPlansApiService: PricingPlansApiService,
    private matDialog: MatDialog,
  ) {
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new PricingPlanUIService(
      object as IPricingPlanModel, permissions, state, this.router, this.config, this.pricingPlansApiService,
      this.matDialog,
    );
  }

  getTableData(objectList: FleioObjectsList<IPricingPlanModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '30', flexXs: '70',
          },
          {
            type: ColumnType.Value, displayName: 'Currency', enableSort: true, fieldName: 'currency',
          },
          {
            type: ColumnType.Value, displayName: 'Is default', enableSort: false, fieldName: 'is_default',
            hide: 'xs',
          },
          {
            type: ColumnType.Value, displayName: 'Reseller', enableSort: false, fieldName: 'reseller_client',
            hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
            hide: 'xs',
          },
        ],
        columnNames: ['name', 'currency', 'is_default', 'reseller_client', '(actions)'],
      },
      rows: [],
    };

    for (const plan of objectList.objects) {
      const rowUIService = this.getObjectUIService(plan, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: plan.name},
          currency: {text: plan.currency},
          is_default: {text: plan.is_default.toString()},
          reseller_client: {text: plan.reseller_client ? plan.reseller_client.name.toString() : ''},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: plan,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new pricing plan',
        tooltip: 'Create new pricing plan',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('settings/openstack-plans/create')
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
